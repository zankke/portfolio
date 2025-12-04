(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/components/Hero.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
;
;
;
function Hero() {
    const containerVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center p-4 dark:bg-gray-800",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "text-center",
            variants: containerVariants,
            initial: "hidden",
            animate: "visible",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    variants: itemVariants,
                    className: "relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mx-auto mb-6 border-4 border-blue-500 shadow-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/images/profile.jpg",
                        alt: "Profile Picture of 이상훈",
                        fill: true,
                        className: "object-cover",
                        priority: true
                    }, void 0, false, {
                        fileName: "[project]/components/Hero.js",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Hero.js",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                    variants: itemVariants,
                    className: "text-4xl md:text-6xl font-extrabold leading-tight",
                    children: "이상훈"
                }, void 0, false, {
                    fileName: "[project]/components/Hero.js",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].p, {
                    variants: itemVariants,
                    className: "mt-2 text-xl md:text-2xl text-blue-300 font-medium",
                    children: "Full Stack AI Developer | AI Platform Director"
                }, void 0, false, {
                    fileName: "[project]/components/Hero.js",
                    lineNumber: 48,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].p, {
                    variants: itemVariants,
                    className: "mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-300 leading-relaxed",
                    children: "AI 기술로 비즈니스 자동화를 설계하고, 데이터 기반 서비스를 구현합니다. 혁신적인 솔루션으로 복잡한 문제를 해결하며, 기술과 비즈니스의 교차점에서 가치를 창출하는 데 열정적입니다."
                }, void 0, false, {
                    fileName: "[project]/components/Hero.js",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].a, {
                    variants: itemVariants,
                    href: "#projects",
                    className: "mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg",
                    children: "View My Projects"
                }, void 0, false, {
                    fileName: "[project]/components/Hero.js",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Hero.js",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Hero.js",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = Hero;
var _c;
__turbopack_context__.k.register(_c, "Hero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/About.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>About
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-intersection-observer/dist/index.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function About() {
    _s();
    const [ref, inView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useInView"])({
        triggerOnce: true,
        threshold: 0.1
    });
    const variants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };
    const timelineEvents = [
        {
            year: "2021~현재",
            title: "베리타스커넥트 – 생성형 AI 플랫폼 및 LLM 인프라 구축",
            description: "AI 기술을 활용한 비즈니스 자동화 및 데이터 기반 서비스 구현 주도."
        },
        {
            year: "2018~2021",
            title: "아이너스 – 고객소통플랫폼·LMS 시스템 PM",
            description: "고객 소통 및 학습 관리 시스템 전반의 프로젝트 관리 및 개발."
        },
        {
            year: "2015~2018",
            title: "CJ E&M – 글로벌 디지털 스폰서십 및 미디어 솔루션",
            description: "글로벌 시장을 위한 디지털 스폰서십 전략 수립 및 미디어 솔루션 개발."
        },
        {
            year: "2009~2015",
            title: "메조미디어 – 광고 플랫폼 및 데이터 분석 DMP 개발",
            description: "광고 플랫폼 개발 및 데이터 관리 플랫폼(DMP) 구축, 데이터 분석."
        },
        {
            year: "2004~2009",
            title: "KT-Alpha(구. KT하이텔) IT예산심의관리, 프로젝트매니지먼트 플랫폼 구축",
            description: "IT예산분석,심의,관리. 프로젝트 관리 체계 구축"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "about",
        className: "bg-gray-900 py-16 px-4 text-white dark:bg-gray-800",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-5xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                    className: "text-4xl font-bold text-center mb-12",
                    initial: {
                        opacity: 0,
                        y: -50
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        duration: 0.5
                    },
                    children: "About Me"
                }, void 0, false, {
                    fileName: "[project]/components/About.js",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    ref: ref,
                    variants: variants,
                    initial: "hidden",
                    animate: inView ? "visible" : "hidden",
                    className: "bg-gray-800 p-8 rounded-lg shadow-xl dark:bg-gray-900",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg text-gray-300 leading-relaxed mb-6",
                            children: "생성형 AI와 데이터 분석 중심의 풀스택 개발자로, Python, Django, React, Streamlit을 기반으로 사용자 맞춤형 플랫폼을 개발하고 있습니다. 기술을 통해 비즈니스 가치를 극대화하고, 혁신적인 솔루션으로 복잡한 문제를 해결하는 데 열정적입니다."
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-semibold text-white mb-4",
                            children: "핵심 역량"
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "list-disc list-inside text-md text-gray-400 leading-relaxed mb-6 pl-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "AI & LLM 활용 자동화 설계: ChatGPT, Claude, KoBERT 등 적용 경험"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "데이터 파이프라인 구축: Google API, n8n, JSON Workflow 설계"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "백엔드 및 프론트엔드 통합 역량: Python, Node.js, PHP, Vue.js"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "시스템 아키텍처 설계: 고가용성 환경(Load Balancer, Replication) 구축"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-semibold text-white mb-4",
                            children: "기술 리더십 경험"
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-md text-gray-400 leading-relaxed mb-6",
                            children: "다수의 프로젝트에서 AI 모델 개발부터 서비스 배포까지 전 과정(End-to-End)을 주도하며 기술 팀을 이끌었습니다. 효율적인 개발 프로세스 구축, 코드 품질 향상, 그리고 최신 AI 기술 스택 도입을 통해 프로젝트 성공에 기여했습니다. 특히, 팀원들의 성장을 지원하고 기술적 난관을 함께 극복하며 시너지를 창출하는 데 중점을 두었습니다."
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-semibold text-white mb-4",
                            children: "비전"
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-md text-gray-400 leading-relaxed mb-12",
                            children: "AI 기술이 인간의 삶과 비즈니스에 긍정적인 영향을 미칠 수 있도록 끊임없이 연구하고 구현하는 것이 저의 비전입니다. AI를 활용하여 비즈니스와 AI의 연결을 재정의하고, 데이터를 기반으로 새로운 가치를 창출하며, 미래 지향적 기술 생태계를 구축하는 데 기여하고자 합니다."
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-semibold text-white mb-4 text-center",
                            children: "주요 성과 요약"
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "list-disc list-inside text-md text-gray-400 leading-relaxed mb-8 pl-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "AI 자동화 프로젝트 다수 수행 → 콘텐츠 생성/데이터 분석 효율 평균 150% 향상"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "의료, 금융, 교육 등 B2B SaaS 플랫폼 구축 경험 풍부"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "데이터 시각화 기반의 BI 시스템 설계 및 운영 역량 보유"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-semibold text-white mb-8 text-center",
                            children: "경력 타임라인"
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative pl-8 sm:pl-32 py-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-8 sm:left-20 top-0 bottom-0 w-1 bg-blue-500 rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                timelineEvents.map((event, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative mb-8 last:mb-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute -left-2 sm:-left-12 w-4 h-4 bg-blue-500 rounded-full z-10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/About.js",
                                                        lineNumber: 104,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute -left-8 sm:-left-32 text-gray-400 text-sm sm:text-base font-semibold w-20 text-right",
                                                        children: event.year
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/About.js",
                                                        lineNumber: 105,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "text-xl font-semibold text-white ml-6 sm:ml-12",
                                                        children: event.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/About.js",
                                                        lineNumber: 108,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/About.js",
                                                lineNumber: 103,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 text-md ml-6 sm:ml-12",
                                                children: event.description
                                            }, void 0, false, {
                                                fileName: "[project]/components/About.js",
                                                lineNumber: 110,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-semibold text-white mb-4 mt-12 text-center",
                            children: "향후 목표"
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "list-disc list-inside text-md text-gray-400 leading-relaxed pl-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "LLM 기반 데이터 분석 & 시각화 자동화 역량 확장"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "B2B SaaS 시스템의 고도화 및 AI Ops 통합 추진"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "산업별 맞춤형 AI 플랫폼 컨설팅 및 고도화 지원"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/About.js",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/About.js",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/About.js",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(About, "GpcLnEGLCRT/LcXgsVwPMCbjDPg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = About;
var _c;
__turbopack_context__.k.register(_c, "About");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Projects.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Projects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-intersection-observer/dist/index.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function Projects() {
    _s();
    const [selectedProject, setSelectedProject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('All');
    const [ref, inView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useInView"])({
        triggerOnce: true,
        threshold: 0.1
    });
    const containerVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };
    const allProjects = [
        {
            title: "AI Video Generation Framework",
            tech: "Python, Node.js, REST API, JSON 파이프라인",
            desc: "AI 기반 영상 자동 생성 플랫폼 기획 및 아키텍처 설계. 시놉시스 → 시나리오 → 콘셉트 → 영상/오디오 생성까지 End-to-End Workflow 구현. 콘텐츠 생성 자동화로 생산성 60% 이상 향상.",
            image: "/images/prjAI_Video_Framework.png",
            longDesc: `
        **기여 영역:** AI 기반 영상 자동 생성 플랫폼 기획 및 아키텍처 설계
        **주요 기능:** 시놉시스 → 시나리오 → 콘셉트 → 영상/오디오 생성까지 End-to-End Workflow 구현
        **성과:** 콘텐츠 생성 자동화로 약 생산성 60% 이상 향상
        **기술 스택:** Python, Node.js, REST API, JSON 파이프라인
      `,
            category: 'AI'
        },
        {
            title: "Edge&Next 의료정보 통합 플랫폼",
            tech: "CentOS, Apache2, Nginx, PHP 7.4, EMR 연동, React",
            desc: "병원 EMR 연동 및 신약정보 조회 UI 개발. Proxy 기반 다단 인증 구조 설계. 실시간 DB 복제(Replication) 구조로 고가용성 확보.",
            image: "/images/prjAutomation_01_social.png",
            longDesc: `
        **역할:** 시스템 설계 및 백엔드 통합
        **주요 업무:**
        *   병원 EMR(전자차트) 연동 및 신약정보 조회 UI 개발
        *   Proxy 기반 다단 인증 구조 설계 (CentOS / Apache2 / Nginx / PHP 7.4)
        **특징:** 실시간 DB 복제(Replication) 구조로 고가용성 확보
      `,
            category: 'Web'
        },
        {
            title: "Sales Admin System v3.0",
            tech: "SaaS, BI, AI Dashboard, Python, Node.js",
            desc: "SaaS형 영업관리 시스템 (Sales Dashboard) 구축. 매출 및 목표 실적, 수익률 시각화. 팀별, 광고주별 리포트 자동 생성. AI 캠페인 성과 분석 시스템 탑재 (자연어 질의 기반 분석).",
            image: "/images/prjInfra_SalesMgmt.png",
            longDesc: `
        **기여도:** SaaS형 영업관리 시스템 (Sales Dashboard)
        **주요 기능:**
        *   매출 및 목표 실적, 수익률 시각화
        *   팀별, 광고주별 리포트 자동 생성
        *   AI 캠페인 성과 분석 시스템 탑재 (자연어 질의 기반 분석)
        **성과:** 분석 효율 193% 향상, 데이터 분석 자동화 구축
      `,
            category: 'Automation'
        },
        {
            title: "MarketLink Consumer Survey Center",
            tech: "KoBERT, GPT-4, 설문 응답 분류, CSV 처리",
            desc: "조사자동화 AI 시스템 설계 및 구현. KoBERT + GPT-4 기반 설문 응답 분류 자동화. CSV → Code 분류 → Keyword 통계/시각화 자동 처리.",
            image: "/images/prjOpenSurvey.png",
            longDesc: `
        **역할:** 조사자동화 AI 시스템 설계 및 구현
        **기술 요소:**
        *   KoBERT + GPT-4 기반 설문 응답 분류 자동화
        *   CSV → Code 분류 → Keyword 통계/시각화 자동 처리
        **성과:** 기존 인력 대비 데이터 처리 속도 150배 향상
      `,
            category: 'AI'
        },
        {
            title: "Kakaopay Securities Dashboard",
            tech: "Apache-Tomcat, 데이터 로그 분석, 트래픽 모니터링",
            desc: "데이터 로그 분석 및 트래픽 모니터링 시스템 구축. Apache-Tomcat 기반 로그 파이프라인 구축. 실시간 서비스 상태 모니터링 및 장애 예측 모델 도입.",
            image: "/images/prjKakaopaysec_Monitoring.png",
            longDesc: `
        **기여도:** 데이터 로그 분석 및 트래픽 모니터링 시스템 구축
        **주요 성과:**
        *   Apache-Tomcat 기반 로그 파이프라인 구축
        *   실시간 서비스 상태 모니터링 및 장애 예측 모델 도입
      `,
            category: 'Web'
        },
        {
            title: "교육연수원 및 e-Learning 플랫폼 개발",
            tech: "모바일 반응형 웹, UX/UI, LMS",
            desc: "모바일 반응형 웹 구현 (교육신청, 이수증 발급, 커뮤니티). 네이티브 UX를 고려한 국공립 연수관리 UI 설계. 월간 사용자 수 30% 증가, 서버 부하 25% 감소.",
            image: "/images/prjKFTA_Responsive.png",
            longDesc: `
        **주요 기능:**
        *   모바일 반응형 웹 구현 (교육신청, 이수증 발급, 커뮤니티)
        *   네이티브 UX를 고려한 국공립 연수관리 UI 설계
        **성과:** 월간 사용자 수 30% 증가, 서버 부하 25% 감소
      `,
            category: 'Web'
        },
        {
            title: "AI 기반 콘텐츠 자동 생성 워크플로우",
            tech: "Claude API, Google Sheet API, Hashtag Generation",
            desc: "Claude API, Hashtag Generation, Google Sheet API 연동. 이미지/텍스트 자동화 기반 SNS 콘텐츠 생성. 포스트 생성 자동화 파이프라인 구축.",
            image: "/images/prjWorkflowAutomation.png",
            longDesc: `
        **주요 기술:**
        *   Claude API, Hashtag Generation, Google Sheet API 연동
        *   이미지/텍스트 자동화 기반 SNS 콘텐츠 생성
        **성과:**
        *   포스트 생성 자동화 파이프라인 구축 (기획 → 해시태그 → 이미지 → 업로드)
        *   마케팅팀 작업시간 70% 단축
      `,
            category: 'AI'
        },
        {
            title: "한국교총 종합교육연수원 웹 개편 및 LMS 시스템 개선",
            tech: "PHP, MS-SQL, IIS, HTML5, JavaScript, CSS, CDN, .NET Framework",
            desc: "한국교총 종합교육연수원 웹사이트 전면 개편, 반응형/적응형 웹 구현, FLASH 컨텐츠 변환, LMS 기능 개선 등을 통해 사이트 재도약 및 운영 효율 증대.",
            image: "/images/prjKFTA_main.png",
            longDesc: `
        **과업 수행 목표:** 'TOP 교원 연수 사이트로 Re-Positioning'을 목표로 하며, 2020 KERIS 연수원 평가 대비 요구조건 반영, 모바일 대응 사이트 개편, FLASH 지원 종료에 따른 대응, LMS/LCMS 기능 개선, 이용자 유입 확대를 위한 UX/UI 개선 등을 포함합니다.

        **주요 과제 및 진행 결과 요약 (2020.11.05일 기준):**
        *   종합교육연수원 반응형 웹 전면 개편 (www.kftaedu.or.kr): 5월 31일 완료되었으며, 운영 지원이 진행 중입니다.
        *   원격교육연수원 "사제동행" 1차 개편 (리뉴얼): 3월 30일 완료되었으며, 교육 이수 조건 변경 반영 및 디자인 전면 리뉴얼 등이 이루어졌습니다.
        *   원격교육연수원 "사제동행" 2차 개편 (반응형 웹): 개발 진척율 90%로, 연내(12월 2주 이내) 완료를 목표로 진행 중입니다.
        *   FLASH 컨텐츠 변환: 계획된 1,800차시(80개 과정 이내) 대비 실제 1,802차시(75개 과정)가 진행되었으며, 진행율은 93%입니다.

        **원격교육연수원 사제동행 1차 리뉴얼 개편 (2020.01.02~2020.3.28):**
        디자인 리뉴얼 전면 개편, PC 가로 폭 가변 확대, LMS 연수 이수 조건 변경 개발이 수행되었고, 완료 후 운영 유지 보수가 지원 중입니다.

        **LMS 연수 이수 조건 변경 개발 (1차 개편 관련):**
        *   1, 2학점 과정의 경우, 기존의 '학습 참여(20점)'와 '설문(20점)'이 삭제되고, '의견 등록(신설, 40점)'이 추가되었으며, 온라인 시험은 60점으로 유지되었습니다.
        *   4학점 과정의 경우, 기존의 '진도 점수(10점)'가 삭제되고, '온라인 시험'이 10점에서 20점으로 변경되었습니다. 진도율은 80% 이상에서 90% 이상으로 변경되었습니다.
        *   이수 기준은 '총점 60점 이상 / 진도율 90% 이상'으로 명시되었습니다.

        **종합교육연수원 적응형 웹 전면 개편 (2020.03.02~2020.05.31):** 적응형 웹으로 전면 개편이 완료(100%)되었으며, 운영 지원이 진행 중입니다.

        **FLASH 교육 과정 변환 (2020.02.01~2020.12.31):** FLASH 컨텐츠를 HTML5 및 MP4 형식으로 변환하는 작업이 진행되었으며, 연내 완료 예정(93%)입니다.

        **외부 연동 모듈 변경:** 결제 모듈이 이니시스(INICIS)에서 NHN KCP로, 문자메시지(SMS) 모듈이 KCT(한국케이블텔레콤)에서 와이즈캔(WISECAN)으로 변경되었습니다.

        **추가 개발 사항:** 당초 FLASH 원본 퀴즈를 MP4로 변환했으나, 사용자 상호작용이 필요한 별도 포맷으로 과정 평가(퀴즈) 기능이 추가 개발(차시당 평균 3페이지)되었고, 학습 자료 다운로드 링크도 별도 페이지로 개발(차시당 평균 2페이지)되었습니다.

        **시스템 구성:** 원격교육연수원 '사제동행'은 Web 서버(2대), Contents 서버, LMS 서버, DB 서버(1대, MS-SQL 2012)로 구성되어 있으며, 종합교육연수원은 Web 서버(1대), DB 서버(1대, ORACLE)로 구성되어 있습니다.

        **# 운영 체제 (Operating System):** Windows Server 2012 R2 Standard
        **웹 서버 (Web Server):** IIS 8.5 (Internet Information Services Version 8.5.9600.16384)
        **데이터베이스 (Database):** MS-SQL 2012, ORACLE
        **개발/스크립트 언어:** ASP, HTML5, JavaScript, CSS
        **기타 기술:** CDN, .NET Framework

        **2. 주요 모듈 및 연동 시스템 (Key Modules & Integrations)**
        *   **결제 모듈 (Payment Gateway, PG):** 이니시스 (INICIS) -> NHN KCP
        *   **문자메시지(SMS/LMS/MMS) 모듈:** KCT (한국케이블텔레콤) -> 와이즈캔 (WISECAN)

        **3. 주요 프로젝트 기술 과제 (Key Project Technical Tasks)**
        *   **웹 사이트 개편:** 반응형 웹 (Responsive Web): 원격교육연수원 '사제동행' 사이트 2차 전면 개편, 적응형 웹 (Adaptive Web): 종합교육연수원 사이트 전면 개편
        *   **컨텐츠 변환:** FLASH 컨텐츠를 HTML5 및 MP4 형식으로 변환, 사용자 상호작용 퀴즈 및 학습 자료 다운로드 페이지 추가 개발.
        *   **LMS 기능 개발:** KERIS 연수 이수 조건 변경에 따른 LMS 시스템 재개발 (의견 등록 신설, 온라인 시험 점수 변경, 진도율 기준 통일).

        **4. 기타 개발/개선 사항**
        *   검색엔진 최적화 (SEO): 기초 마련
        *   운영 자동화: 수강연기/취소/과목변경 자동화 처리, 관리자 페이지 구현, 자격증 발급 프로세스 개선, 단체 신청 관련 기능 강화.
        *   사용자 편의 기능: NICE 개인번호 자동 입력, 포인트 적립/차감 오류 개선, LMS 관리자 화면 개선.
      `,
            category: 'Web'
        }
    ];
    const filteredProjects = allProjects.filter((project)=>filter === 'All' ? true : project.category === filter);
    const openModal = (project)=>{
        setSelectedProject(project);
        setIsModalOpen(true);
    };
    const closeModal = ()=>{
        setIsModalOpen(false);
        setSelectedProject(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "projects",
        className: "bg-gray-900 py-16 px-4 text-white dark:bg-gray-800",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                    className: "text-4xl font-bold text-center mb-12",
                    initial: {
                        opacity: 0,
                        y: -50
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        duration: 0.5
                    },
                    children: "Projects"
                }, void 0, false, {
                    fileName: "[project]/components/Projects.js",
                    lineNumber: 202,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center space-x-4 mb-8",
                    children: [
                        'All',
                        'AI',
                        'Web',
                        'Automation'
                    ].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setFilter(cat),
                            className: `px-6 py-2 rounded-full font-semibold transition-colors duration-300
                ${filter === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`,
                            children: cat
                        }, cat, false, {
                            fileName: "[project]/components/Projects.js",
                            lineNumber: 214,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/Projects.js",
                    lineNumber: 212,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    ref: ref,
                    variants: containerVariants,
                    initial: "hidden",
                    animate: inView ? "visible" : "hidden",
                    className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
                    children: filteredProjects.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            variants: itemVariants,
                            className: "relative bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 flex flex-col border border-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative h-48 w-full mb-4 rounded-md overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: p.image,
                                        alt: p.title,
                                        fill: true,
                                        className: "object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Projects.js",
                                        lineNumber: 239,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Projects.js",
                                    lineNumber: 238,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-2xl font-semibold mb-2",
                                    children: p.title
                                }, void 0, false, {
                                    fileName: "[project]/components/Projects.js",
                                    lineNumber: 246,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 text-md flex-grow",
                                    children: p.desc
                                }, void 0, false, {
                                    fileName: "[project]/components/Projects.js",
                                    lineNumber: 247,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-blue-400 text-sm mt-4",
                                    children: p.tech
                                }, void 0, false, {
                                    fileName: "[project]/components/Projects.js",
                                    lineNumber: 248,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>openModal(p),
                                    className: "mt-6 self-start text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center",
                                    children: [
                                        "🔗 자세히 보기",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            className: "h-4 w-4 ml-1",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Projects.js",
                                                lineNumber: 261,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Projects.js",
                                            lineNumber: 254,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Projects.js",
                                    lineNumber: 249,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/components/Projects.js",
                            lineNumber: 233,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/Projects.js",
                    lineNumber: 225,
                    columnNumber: 9
                }, this),
                isModalOpen && selectedProject && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-800 p-8 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: closeModal,
                                className: "absolute top-4 right-4 text-gray-400 hover:text-white text-3xl leading-none",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/components/Projects.js",
                                lineNumber: 277,
                                columnNumber: 15
                            }, this),
                            selectedProject.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-60 w-full mb-6 rounded-md overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: selectedProject.image,
                                    alt: selectedProject.title,
                                    fill: true,
                                    className: "object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/components/Projects.js",
                                    lineNumber: 285,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Projects.js",
                                lineNumber: 284,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-3xl font-bold text-white mb-3",
                                children: selectedProject.title
                            }, void 0, false, {
                                fileName: "[project]/components/Projects.js",
                                lineNumber: 293,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-blue-400 text-lg mb-4",
                                children: selectedProject.tech
                            }, void 0, false, {
                                fileName: "[project]/components/Projects.js",
                                lineNumber: 294,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-300 whitespace-pre-line leading-relaxed",
                                children: selectedProject.longDesc
                            }, void 0, false, {
                                fileName: "[project]/components/Projects.js",
                                lineNumber: 295,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Projects.js",
                        lineNumber: 276,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Projects.js",
                    lineNumber: 275,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Projects.js",
            lineNumber: 201,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Projects.js",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
_s(Projects, "ThoNrFAAJFdY/Kef1gByyhfKg48=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = Projects;
var _c;
__turbopack_context__.k.register(_c, "Projects");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Skills.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Skills
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-intersection-observer/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@devicon/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
// Helper to get icon component by name (case-insensitive and flexible)
const getIconComponent = (iconName)=>{
    switch(iconName.toLowerCase()){
        case 'python':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PythonOriginalIcon"];
        case 'django':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DjangoOriginalIcon"];
        case 'react':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ReactOriginalIcon"];
        case 'vue.js':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["VuejsOriginalIcon"];
        case 'html5':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Html5OriginalIcon"];
        case 'node.js':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["NodejsOriginalIcon"];
        case 'php':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PhpOriginalIcon"];
        case 'mysql':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MysqlOriginalIcon"];
        case 'mariadb':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MysqlOriginalIcon"]; // Using MySQL icon as placeholder
        case 'sqlite':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MysqlOriginalIcon"]; // Using MySQL icon as placeholder
        case 'nginx':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["NginxOriginalIcon"];
        case 'centos':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GithubbadgeOriginalIcon"]; // Placeholder for CentOS
        case 'docker':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DockerOriginalIcon"];
        case 'loadbalancer':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["NginxOriginalIcon"]; // Using Nginx as placeholder for LoadBalancer
        case 'kobert':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GithubbadgeOriginalIcon"]; // Placeholder for KoBERT
        case 'gpt-4':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GithubbadgeOriginalIcon"]; // Placeholder for GPT-4
        case 'claude api':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GithubbadgeOriginalIcon"]; // Placeholder for Claude API
        case 'tensorflow':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PytorchOriginalIcon"]; // Using Pytorch as placeholder
        case 'aws':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["AmazonwebservicesOriginalIcon"];
        case 'google cloud':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GooglecloudOriginalIcon"];
        case 'google sheets api':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["JenkinsOriginalIcon"]; // Placeholder for Google Sheets API
        case 'n8n':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["JenkinsOriginalIcon"];
        case 'openapi':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GitOriginalIcon"]; // Placeholder for OpenAPI
        case 'fastapi':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PythonOriginalIcon"]; // FastAPI is Python based
        case 'javascript':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["JavascriptOriginalIcon"];
        case 'css':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Css3OriginalIcon"];
        case 'kubernetes':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["KubernetesOriginalIcon"];
        case 'figma':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["FigmaOriginalIcon"];
        case 'streamlit':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PythonOriginalIcon"]; // Streamlit is Python based
        case 'ollama':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GithubbadgeOriginalIcon"];
        case 'hugging face':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GithubbadgeOriginalIcon"];
        case 'replicate api':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GithubbadgeOriginalIcon"];
        case 'ncp':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GooglecloudOriginalIcon"]; // Using GCP as a placeholder for NCP
        case 'vercel':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["NodejsOriginalIcon"]; // Vercel is JS ecosystem
        case 'airflow':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["JenkinsOriginalIcon"];
        case 'celery':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["JenkinsOriginalIcon"];
        case 'api integration':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GitOriginalIcon"];
        case 'iis':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GitOriginalIcon"]; // Generic placeholder
        case '.net framework':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GitOriginalIcon"]; // Generic placeholder
        case 'dmp':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$devicon$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GitOriginalIcon"]; // Generic placeholder
        default:
            return null;
    }
};
function Skills() {
    _s();
    const [ref, inView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useInView"])({
        triggerOnce: true,
        threshold: 0.1
    });
    const containerVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };
    const categorizedSkills = {
        Frontend: [
            {
                name: "Vue.js",
                icon: "vue.js"
            },
            {
                name: "React",
                icon: "react"
            },
            {
                name: "HTML5",
                icon: "html5"
            }
        ],
        Backend: [
            {
                name: "Node.js",
                icon: "node.js"
            },
            {
                name: "Python (FastAPI)",
                icon: "fastapi"
            },
            {
                name: "PHP 7.4",
                icon: "php"
            },
            {
                name: "MySQL",
                icon: "mysql"
            },
            {
                name: "MariaDB",
                icon: "mariadb"
            },
            {
                name: "SQLite",
                icon: "sqlite"
            }
        ],
        "AI/ML Tools": [
            {
                name: "KoBERT",
                icon: "kobert"
            },
            {
                name: "GPT-4",
                icon: "gpt-4"
            },
            {
                name: "Claude API",
                icon: "claude api"
            },
            {
                name: "TensorFlow",
                icon: "tensorflow"
            }
        ],
        "Infra/DevOps": [
            {
                name: "Nginx",
                icon: "nginx"
            },
            {
                name: "CentOS",
                icon: "centos"
            },
            {
                name: "Docker",
                icon: "docker"
            },
            {
                name: "LoadBalancer",
                icon: "loadbalancer"
            },
            {
                name: "AWS",
                icon: "aws"
            },
            {
                name: "Google Cloud",
                icon: "google cloud"
            }
        ],
        "Automation & Report": [
            {
                name: "Google Sheets API",
                icon: "google sheets api"
            },
            {
                name: "n8n",
                icon: "n8n"
            },
            {
                name: "OpenAPI",
                icon: "openapi"
            }
        ]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "skills",
        className: "bg-gray-900 py-16 px-4 text-white dark:bg-gray-800",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                    className: "text-4xl font-bold text-center mb-12",
                    initial: {
                        opacity: 0,
                        y: -50
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        duration: 0.5
                    },
                    children: "Skills"
                }, void 0, false, {
                    fileName: "[project]/components/Skills.js",
                    lineNumber: 120,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    ref: ref,
                    variants: containerVariants,
                    initial: "hidden",
                    animate: inView ? "visible" : "hidden",
                    className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
                    children: Object.entries(categorizedSkills).map(([category, skills])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            variants: itemVariants,
                            className: "relative bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-2xl font-semibold text-blue-400 mb-4",
                                    children: category
                                }, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-3",
                                    children: skills.map((skill)=>{
                                        const IconComponent = getIconComponent(skill.icon);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-md font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center",
                                            children: [
                                                IconComponent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                    size: 20,
                                                    className: "mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Skills.js",
                                                    lineNumber: 150,
                                                    columnNumber: 41
                                                }, this),
                                                skill.name
                                            ]
                                        }, skill.name, true, {
                                            fileName: "[project]/components/Skills.js",
                                            lineNumber: 146,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 142,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, category, true, {
                            fileName: "[project]/components/Skills.js",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/Skills.js",
                    lineNumber: 128,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Skills.js",
            lineNumber: 119,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Skills.js",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
_s(Skills, "GpcLnEGLCRT/LcXgsVwPMCbjDPg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = Skills;
var _c;
__turbopack_context__.k.register(_c, "Skills");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Contact.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Contact
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-intersection-observer/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function Contact() {
    _s();
    const [ref, inView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useInView"])({
        triggerOnce: true,
        threshold: 0.1
    });
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        email: '',
        message: ''
    });
    const [formStatus, setFormStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''); // 'success', 'error', 'submitting'
    const variants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };
    const handleCopyEmail = async ()=>{
        try {
            await navigator.clipboard.writeText('itsme@sfai.im');
            setCopied(true);
            setTimeout(()=>setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy email: ', err);
        }
    };
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setFormStatus('submitting');
        // In a real application, you would send this data to an API endpoint
        // For demonstration, we'll just show an alert
        alert(`Form Submitted!
    Name: ${formData.name}
    Email: ${formData.email}
    Message: ${formData.message}`);
        setFormStatus('success');
        setFormData({
            name: '',
            email: '',
            message: ''
        }); // Clear form
        setTimeout(()=>setFormStatus(''), 3000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "contact",
        className: "bg-gray-900 py-16 px-4 text-white dark:bg-gray-800",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
            ref: ref,
            variants: variants,
            initial: "hidden",
            animate: inView ? "visible" : "hidden",
            className: "max-w-4xl mx-auto text-center bg-gray-800 p-8 rounded-lg shadow-xl dark:bg-gray-900",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-4xl font-bold mb-6",
                    children: "Get in Touch"
                }, void 0, false, {
                    fileName: "[project]/components/Contact.js",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg mb-8 text-gray-300",
                    children: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
                }, void 0, false, {
                    fileName: "[project]/components/Contact.js",
                    lineNumber: 67,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl",
                            children: [
                                "Email: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "mailto:itsme@sfai.im",
                                    className: "text-blue-400 hover:underline mr-2",
                                    children: "itsme@sfai.im"
                                }, void 0, false, {
                                    fileName: "[project]/components/Contact.js",
                                    lineNumber: 73,
                                    columnNumber: 41
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Contact.js",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleCopyEmail,
                            className: "p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 text-sm",
                            "aria-label": "Copy email address",
                            children: copied ? 'Copied!' : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                className: "h-5 w-5",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                strokeWidth: 2,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m-4 3H9m1.5-6.5v6.5m1-11v4m-4 4h7.5"
                                }, void 0, false, {
                                    fileName: "[project]/components/Contact.js",
                                    lineNumber: 81,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Contact.js",
                                lineNumber: 80,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Contact.js",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Contact.js",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-3xl font-bold mb-6",
                    children: "Send a Message"
                }, void 0, false, {
                    fileName: "[project]/components/Contact.js",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "max-w-lg mx-auto space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "name",
                                placeholder: "Your Name",
                                value: formData.name,
                                onChange: handleChange,
                                required: true,
                                className: "w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/components/Contact.js",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Contact.js",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "email",
                                name: "email",
                                placeholder: "Your Email",
                                value: formData.email,
                                onChange: handleChange,
                                required: true,
                                className: "w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/components/Contact.js",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Contact.js",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                name: "message",
                                placeholder: "Your Message",
                                rows: "5",
                                value: formData.message,
                                onChange: handleChange,
                                required: true,
                                className: "w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/components/Contact.js",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Contact.js",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: formStatus === 'submitting',
                            className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
                            children: formStatus === 'submitting' ? 'Sending...' : 'Send Message'
                        }, void 0, false, {
                            fileName: "[project]/components/Contact.js",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this),
                        formStatus === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-green-400 mt-2",
                            children: "Message sent successfully!"
                        }, void 0, false, {
                            fileName: "[project]/components/Contact.js",
                            lineNumber: 131,
                            columnNumber: 13
                        }, this),
                        formStatus === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-400 mt-2",
                            children: "Failed to send message. Please try again."
                        }, void 0, false, {
                            fileName: "[project]/components/Contact.js",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Contact.js",
                    lineNumber: 89,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center space-x-6 mt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://github.com/your-github",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg",
                            children: "GitHub"
                        }, void 0, false, {
                            fileName: "[project]/components/Contact.js",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://linkedin.com/in/your-linkedin",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg",
                            children: "LinkedIn"
                        }, void 0, false, {
                            fileName: "[project]/components/Contact.js",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Contact.js",
                    lineNumber: 138,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Contact.js",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Contact.js",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(Contact, "vbR5yhyviS+mr4NTvnM5qTF7+U4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = Contact;
var _c;
__turbopack_context__.k.register(_c, "Contact");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/context/ThemeContext.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"])();
const ThemeProvider = ({ children })=>{
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('dark'); // Default to dark mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const root = window.document.documentElement;
            if (theme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    }["ThemeProvider.useEffect"], [
        theme
    ]);
    const toggleTheme = ()=>{
        setTheme((prevTheme)=>prevTheme === 'dark' ? 'light' : 'dark');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            toggleTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/ThemeContext.js",
        lineNumber: 22,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ThemeProvider, "D0ekClnfIGVExrH5c3Ka+aWcxxE=");
_c = ThemeProvider;
const useTheme = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
};
_s1(useTheme, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ThemeToggle.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$ThemeContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/ThemeContext.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function ThemeToggle() {
    _s();
    const { theme, toggleTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$ThemeContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: toggleTheme,
        className: "p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white fixed bottom-4 right-4 shadow-lg z-50 transition-colors duration-300",
        "aria-label": "Toggle theme",
        children: theme === 'dark' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-6 w-6",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.525l.707-.707M4.975 19.025l-.707.707M17.325 19.025l.707.707M4.975 4.975l-.707-.707"
            }, void 0, false, {
                fileName: "[project]/components/ThemeToggle.js",
                lineNumber: 21,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ThemeToggle.js",
            lineNumber: 14,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-6 w-6",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            }, void 0, false, {
                fileName: "[project]/components/ThemeToggle.js",
                lineNumber: 36,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ThemeToggle.js",
            lineNumber: 29,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ThemeToggle.js",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_s(ThemeToggle, "Q4eAjrIZ0CuRuhycs6byifK2KBk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$ThemeContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = ThemeToggle;
var _c;
__turbopack_context__.k.register(_c, "ThemeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Navbar.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$ThemeContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/ThemeContext.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function Navbar() {
    _s();
    const { theme, toggleTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$ThemeContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const getLinkClass = (href)=>{
        let isActive = false;
        if (href.startsWith('#')) {
            // For hash links, check both pathname and hash
            isActive = router.pathname === '/' && router.asPath === href;
        } else {
            // For page links, check only pathname
            isActive = router.pathname === href;
        }
        return `text-gray-300 hover:text-blue-400 transition-colors duration-300 ${isActive ? 'text-blue-400 font-bold border-b-2 border-blue-400' : ''}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "fixed top-0 left-0 w-full bg-gray-800 bg-opacity-70 backdrop-blur-md z-40 shadow-lg p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto flex justify-between items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-300",
                    children: "MyPortfolio"
                }, void 0, false, {
                    fileName: "[project]/components/Navbar.js",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-x-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "#about",
                            className: getLinkClass('#about'),
                            children: "About"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "#projects",
                            className: getLinkClass('#projects'),
                            children: "Projects"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "#skills",
                            className: getLinkClass('#skills'),
                            children: "Skills"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "#certification",
                            className: getLinkClass('#certification'),
                            children: [
                                " ",
                                "Certification"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "#contact",
                            className: getLinkClass('#contact'),
                            children: "Contact"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/admin",
                            className: getLinkClass('/admin'),
                            children: "Admin"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Navbar.js",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Navbar.js",
            lineNumber: 24,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Navbar.js",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(Navbar, "DZzTc7XQLufI4kgtNrgZINWZVCE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$ThemeContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ScrollToTopButton.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollToTopButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function ScrollToTopButton() {
    _s();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Show button when page is scrolled up to "showOffset"
    const toggleVisibility = ()=>{
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    // Set up scroll event listener
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollToTopButton.useEffect": ()=>{
            window.addEventListener('scroll', toggleVisibility);
            return ({
                "ScrollToTopButton.useEffect": ()=>{
                    window.removeEventListener('scroll', toggleVisibility);
                }
            })["ScrollToTopButton.useEffect"];
        }
    }["ScrollToTopButton.useEffect"], []);
    // Scroll to top when button is clicked
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].button, {
            onClick: scrollToTop,
            className: "fixed bottom-20 right-4 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 z-50",
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            exit: {
                opacity: 0,
                y: 20
            },
            transition: {
                duration: 0.3
            },
            "aria-label": "Scroll to top",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                className: "h-6 w-6",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 10l7-7m0 0l7 7m-7-7v18"
                }, void 0, false, {
                    fileName: "[project]/components/ScrollToTopButton.js",
                    lineNumber: 51,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ScrollToTopButton.js",
                lineNumber: 44,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ScrollToTopButton.js",
            lineNumber: 35,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ScrollToTopButton.js",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(ScrollToTopButton, "J3yJOyGdBT4L7hs1p1XQYVGMdrY=");
_c = ScrollToTopButton;
var _c;
__turbopack_context__.k.register(_c, "ScrollToTopButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Hero$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Hero.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$About$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/About.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Projects.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skills$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Skills.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Contact$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Contact.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ThemeToggle$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ThemeToggle.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Navbar.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$seo$2f$dist$2f$pages$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-seo/dist/pages.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScrollToTopButton$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ScrollToTopButton.js [client] (ecmascript)"); // Import ScrollToTopButton
;
;
;
;
;
;
;
;
;
;
;
function Home() {
    const seoTags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$seo$2f$dist$2f$pages$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["generateNextSeo"])({
        title: "SANG HOON, LEE - Full Stack AI Developer | AI Platform Director",
        description: "AI 기술로 비즈니스 자동화를 설계하고, 데이터 기반 서비스를 구현합니다. 혁신적인 솔루션으로 복잡한 문제를 해결하며, 기술과 비즈니스의 교차점에서 가치를 창출하는 데 열정적입니다.",
        canonical: "https://www.yourwebsite.com",
        openGraph: {
            url: 'https://www.yourwebsite.com',
            title: 'SANG HOON, LEE - Full Stack AI Developer | AI Platform Director',
            description: 'AI 기술로 비즈니스 자동화를 설계하고, 데이터 기반 서비스를 구현합니다. 혁신적인 솔루션으로 복잡한 문제를 해결하며, 기술과 비즈니스의 교차점에서 가치를 창출하는 데 열정적입니다.',
            images: [
                {
                    url: 'https://www.yourwebsite.com/images/profile.jpg',
                    width: 800,
                    height: 600,
                    alt: '이상훈 Profile Picture',
                    type: 'image/jpeg'
                }
            ],
            site_name: '이상훈 Portfolio'
        },
        twitter: {
            handle: '@yourtwitterhandle',
            site: '@yourtwitterhandle',
            cardType: 'summary_large_image'
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: seoTags
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ThemeToggle$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Hero$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$About$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skills$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Certification, {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Contact$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScrollToTopButton$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            " "
        ]
    }, void 0, true);
}
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/index.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__43968eda._.js.map