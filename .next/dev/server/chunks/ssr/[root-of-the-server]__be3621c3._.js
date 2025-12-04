module.exports = [
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[externals]/framer-motion [external] (framer-motion, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("framer-motion");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/components/Hero.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center p-4 dark:bg-gray-800",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
            className: "text-center",
            variants: containerVariants,
            initial: "hidden",
            animate: "visible",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                    variants: itemVariants,
                    className: "relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mx-auto mb-6 border-4 border-blue-500 shadow-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].h1, {
                    variants: itemVariants,
                    className: "text-4xl md:text-6xl font-extrabold leading-tight",
                    children: "이상훈"
                }, void 0, false, {
                    fileName: "[project]/components/Hero.js",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].p, {
                    variants: itemVariants,
                    className: "mt-2 text-xl md:text-2xl text-blue-300 font-medium",
                    children: "Full Stack AI Developer | AI Platform Director"
                }, void 0, false, {
                    fileName: "[project]/components/Hero.js",
                    lineNumber: 48,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].p, {
                    variants: itemVariants,
                    className: "mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-300 leading-relaxed",
                    children: "AI 기술로 비즈니스 자동화를 설계하고, 데이터 기반 서비스를 구현합니다. 혁신적인 솔루션으로 복잡한 문제를 해결하며, 기술과 비즈니스의 교차점에서 가치를 창출하는 데 열정적입니다."
                }, void 0, false, {
                    fileName: "[project]/components/Hero.js",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].a, {
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/react-intersection-observer [external] (react-intersection-observer, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("react-intersection-observer");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/components/About.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>About
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-intersection-observer [external] (react-intersection-observer, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function About() {
    const [ref, inView] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__["useInView"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        id: "about",
        className: "bg-gray-900 py-16 px-4 text-white dark:bg-gray-800",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "max-w-5xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].h2, {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                    ref: ref,
                    variants: variants,
                    initial: "hidden",
                    animate: inView ? "visible" : "hidden",
                    className: "bg-gray-800 p-8 rounded-lg shadow-xl dark:bg-gray-900",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-lg text-gray-300 leading-relaxed mb-6",
                            children: "생성형 AI와 데이터 분석 중심의 풀스택 개발자로, Python, Node.js, React, Vue.js 등 다양한 최신 기술을 기반으로 사용자 맞춤형 플랫폼을 개발하고 있습니다. 기술을 통해 비즈니스 가치를 극대화하고, 혁신적인 솔루션으로 복잡한 문제를 해결하는 데 열정적입니다."
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-semibold text-white mb-4",
                            children: "기술 스택"
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                            className: "list-disc list-inside text-md text-gray-400 leading-relaxed mb-6 pl-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-white",
                                            children: "Backend:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/About.js",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, this),
                                        " Node.js, Python (FastAPI), PHP 7.4"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-white",
                                            children: "Frontend:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/About.js",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, this),
                                        " Vue.js, React, HTML5"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-white",
                                            children: "Database:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/About.js",
                                            lineNumber: 77,
                                            columnNumber: 15
                                        }, this),
                                        " MySQL, MariaDB, SQLite"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-white",
                                            children: "Infra/DevOps:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/About.js",
                                            lineNumber: 80,
                                            columnNumber: 15
                                        }, this),
                                        " Nginx, CentOS, Docker, LoadBalancer"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-white",
                                            children: "AI/ML Tools:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/About.js",
                                            lineNumber: 83,
                                            columnNumber: 15
                                        }, this),
                                        " KoBERT, GPT-4, Claude API, TensorFlow"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-white",
                                            children: "Cloud Platform:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/About.js",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this),
                                        " AWS, Google Cloud"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-white",
                                            children: "Automation & Report:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/About.js",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, this),
                                        " Google Sheets API, n8n, OpenAPI"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-semibold text-white mb-4",
                            children: "핵심 역량"
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                            className: "list-disc list-inside text-md text-gray-400 leading-relaxed mb-6 pl-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: "AI & LLM 활용 자동화 설계: ChatGPT, Claude, KoBERT 등 적용 경험"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: "데이터 파이프라인 구축: Google API, n8n, JSON Workflow 설계"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: "백엔드 및 프론트엔드 통합 역량: Python, Node.js, PHP, Vue.js"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: "시스템 아키텍처 설계: 고가용성 환경(Load Balancer, Replication) 구축"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-semibold text-white mb-4",
                            children: "기술 리더십 경험"
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-md text-gray-400 leading-relaxed mb-6",
                            children: "다수의 프로젝트에서 AI 모델 개발부터 서비스 배포까지 전 과정(End-to-End)을 주도하며 기술 팀을 이끌었습니다. 효율적인 개발 프로세스 구축, 코드 품질 향상, 그리고 최신 AI 기술 스택 도입을 통해 프로젝트 성공에 기여했습니다. 특히, 팀원들의 성장을 지원하고 기술적 난관을 함께 극복하며 시너지를 창출하는 데 중점을 두었습니다."
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-semibold text-white mb-4",
                            children: "비전"
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-md text-gray-400 leading-relaxed mb-12",
                            children: "AI 기술이 인간의 삶과 비즈니스에 긍정적인 영향을 미칠 수 있도록 끊임없이 연구하고 구현하는 것이 저의 비전입니다. AI를 활용하여 비즈니스와 AI의 연결을 재정의하고, 데이터를 기반으로 새로운 가치를 창출하며, 미래 지향적 기술 생태계를 구축하는 데 기여하고자 합니다."
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-semibold text-white mb-4 text-center",
                            children: "주요 성과 요약"
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                            className: "list-disc list-inside text-md text-gray-400 leading-relaxed mb-8 pl-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: "AI 자동화 프로젝트 다수 수행 → 콘텐츠 생성/데이터 분석 효율 평균 150% 향상"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: "의료, 금융, 교육 등 B2B SaaS 플랫폼 구축 경험 풍부"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: "데이터 시각화 기반의 BI 시스템 설계 및 운영 역량 보유"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-semibold text-white mb-8 text-center",
                            children: "경력 타임라인"
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "relative pl-8 sm:pl-32 py-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "absolute left-8 sm:left-20 top-0 bottom-0 w-1 bg-blue-500 rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this),
                                timelineEvents.map((event, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "relative mb-8 last:mb-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex items-center mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "absolute -left-2 sm:-left-12 w-4 h-4 bg-blue-500 rounded-full z-10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/About.js",
                                                        lineNumber: 131,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "absolute -left-8 sm:-left-32 text-gray-400 text-sm sm:text-base font-semibold w-20 text-right",
                                                        children: event.year
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/About.js",
                                                        lineNumber: 132,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        className: "text-xl font-semibold text-white ml-6 sm:ml-12",
                                                        children: event.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/About.js",
                                                        lineNumber: 135,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/About.js",
                                                lineNumber: 130,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 text-md ml-6 sm:ml-12",
                                                children: event.description
                                            }, void 0, false, {
                                                fileName: "[project]/components/About.js",
                                                lineNumber: 137,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-semibold text-white mb-4 mt-12 text-center",
                            children: "향후 목표"
                        }, void 0, false, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                            className: "list-disc list-inside text-md text-gray-400 leading-relaxed pl-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: "LLM 기반 데이터 분석 & 시각화 자동화 역량 확장"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 145,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: "B2B SaaS 시스템의 고도화 및 AI Ops 통합 추진"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: "산업별 맞춤형 AI 플랫폼 컨설팅 및 고도화 지원"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/About.js",
                            lineNumber: 144,
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/Projects.js [ssr] (ecmascript)", (() => {{

throw new Error("An error occurred while generating the chunk item [project]/components/Projects.js [ssr] (ecmascript)\n\nCaused by:\n- CJS module can't be async.\n\nDebug info:\n- An error occurred while generating the chunk item [project]/components/Projects.js [ssr] (ecmascript)\n- Execution of <ModuleChunkItem as EcmascriptChunkItem>::content_with_async_module_info failed\n- Execution of EcmascriptChunkItemContent::new failed\n- CJS module can't be async.");

}}),
"[externals]/@devicon/react [external] (@devicon/react, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@devicon/react", () => require("@devicon/react"));

module.exports = mod;
}),
"[project]/components/Skills.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Skills
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-intersection-observer [external] (react-intersection-observer, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@devicon/react [external] (@devicon/react, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
// Helper to get icon component by name (case-insensitive and flexible)
const getIconComponent = (iconName)=>{
    switch(iconName.toLowerCase()){
        case 'python':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["PythonOriginalIcon"];
        case 'django':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["DjangoOriginalIcon"];
        case 'react':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["ReactOriginalIcon"];
        case 'vue.js':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["VuejsOriginalIcon"];
        case 'html5':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["Html5OriginalIcon"];
        case 'node.js':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["NodejsOriginalIcon"];
        case 'php':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["PhpOriginalIcon"];
        case 'mysql':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["MysqlOriginalIcon"];
        case 'mariadb':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["MysqlOriginalIcon"]; // Using MySQL icon as placeholder
        case 'sqlite':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["MysqlOriginalIcon"]; // Using MySQL icon as placeholder
        case 'nginx':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["NginxOriginalIcon"];
        case 'centos':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["GithubbadgeOriginalIcon"]; // Placeholder for CentOS
        case 'docker':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["DockerOriginalIcon"];
        case 'loadbalancer':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["NginxOriginalIcon"]; // Using Nginx as placeholder for LoadBalancer
        case 'kobert':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["GithubbadgeOriginalIcon"]; // Placeholder for KoBERT
        case 'gpt-4':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["GithubbadgeOriginalIcon"]; // Placeholder for GPT-4
        case 'claude api':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["GithubbadgeOriginalIcon"]; // Placeholder for Claude API
        case 'tensorflow':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["PytorchOriginalIcon"]; // Using Pytorch as placeholder
        case 'aws':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["AmazonwebservicesOriginalIcon"];
        case 'google cloud':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["GooglecloudOriginalIcon"];
        case 'google sheets api':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["JenkinsOriginalIcon"]; // Placeholder for Google Sheets API
        case 'n8n':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["JenkinsOriginalIcon"];
        case 'openapi':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["GitOriginalIcon"]; // Placeholder for OpenAPI
        case 'fastapi':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["PythonOriginalIcon"]; // FastAPI is Python based
        case 'javascript':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["JavascriptOriginalIcon"];
        case 'css':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["Css3OriginalIcon"];
        case 'kubernetes':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["KubernetesOriginalIcon"];
        case 'figma':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["FigmaOriginalIcon"];
        case 'streamlit':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["PythonOriginalIcon"]; // Streamlit is Python based
        case 'ollama':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["GithubbadgeOriginalIcon"];
        case 'hugging face':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["GithubbadgeOriginalIcon"];
        case 'replicate api':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["GithubbadgeOriginalIcon"];
        case 'ncp':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["GooglecloudOriginalIcon"]; // Using GCP as a placeholder for NCP
        case 'vercel':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["NodejsOriginalIcon"]; // Vercel is JS ecosystem
        case 'airflow':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["JenkinsOriginalIcon"];
        case 'celery':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["JenkinsOriginalIcon"];
        case 'api integration':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["GitOriginalIcon"];
        case 'iis':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["GitOriginalIcon"]; // Generic placeholder
        case '.net framework':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["GitOriginalIcon"]; // Generic placeholder
        case 'dmp':
            return __TURBOPACK__imported__module__$5b$externals$5d2f40$devicon$2f$react__$5b$external$5d$__$2840$devicon$2f$react$2c$__cjs$29$__["GitOriginalIcon"]; // Generic placeholder
        default:
            return null;
    }
};
function Skills() {
    const [ref, inView] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__["useInView"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        id: "skills",
        className: "bg-gray-900 py-16 px-4 text-white dark:bg-gray-800",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].h2, {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                    ref: ref,
                    variants: containerVariants,
                    initial: "hidden",
                    animate: inView ? "visible" : "hidden",
                    className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
                    children: Object.entries(categorizedSkills).map(([category, skills])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                            variants: itemVariants,
                            className: "relative bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    className: "text-2xl font-semibold text-blue-400 mb-4",
                                    children: category
                                }, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-3",
                                    children: skills.map((skill)=>{
                                        const IconComponent = getIconComponent(skill.icon);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-md font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center",
                                            children: [
                                                IconComponent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(IconComponent, {
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/Contact.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Contact
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-intersection-observer [external] (react-intersection-observer, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function Contact() {
    const [ref, inView] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__["useInView"])({
        triggerOnce: true,
        threshold: 0.1
    });
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        name: '',
        email: '',
        message: ''
    });
    const [formStatus, setFormStatus] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(''); // 'success', 'error', 'submitting'
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        id: "contact",
        className: "bg-gray-900 py-16 px-4 text-white dark:bg-gray-800",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
            ref: ref,
            variants: variants,
            initial: "hidden",
            animate: inView ? "visible" : "hidden",
            className: "max-w-4xl mx-auto text-center bg-gray-800 p-8 rounded-lg shadow-xl dark:bg-gray-900",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    className: "text-4xl font-bold mb-6",
                    children: "Get in Touch"
                }, void 0, false, {
                    fileName: "[project]/components/Contact.js",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: "text-lg mb-8 text-gray-300",
                    children: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
                }, void 0, false, {
                    fileName: "[project]/components/Contact.js",
                    lineNumber: 67,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-xl",
                            children: [
                                "Email: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: handleCopyEmail,
                            className: "p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 text-sm",
                            "aria-label": "Copy email address",
                            children: copied ? 'Copied!' : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                className: "h-5 w-5",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                strokeWidth: 2,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                    className: "text-3xl font-bold mb-6",
                    children: "Send a Message"
                }, void 0, false, {
                    fileName: "[project]/components/Contact.js",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "max-w-lg mx-auto space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: formStatus === 'submitting',
                            className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
                            children: formStatus === 'submitting' ? 'Sending...' : 'Send Message'
                        }, void 0, false, {
                            fileName: "[project]/components/Contact.js",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this),
                        formStatus === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-green-400 mt-2",
                            children: "Message sent successfully!"
                        }, void 0, false, {
                            fileName: "[project]/components/Contact.js",
                            lineNumber: 131,
                            columnNumber: 13
                        }, this),
                        formStatus === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex justify-center space-x-6 mt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/ThemeToggle.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$ThemeContext$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/ThemeContext.js [ssr] (ecmascript)");
;
;
;
function ThemeToggle() {
    const { theme, toggleTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$ThemeContext$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        onClick: toggleTheme,
        className: "p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white fixed bottom-4 right-4 shadow-lg z-50 transition-colors duration-300",
        "aria-label": "Toggle theme",
        children: theme === 'dark' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-6 w-6",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
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
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-6 w-6",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
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
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/components/Navbar.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$ThemeContext$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/ThemeContext.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
;
;
;
;
;
function Navbar() {
    const { theme, toggleTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$ThemeContext$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
        className: "fixed top-0 left-0 w-full bg-gray-800 bg-opacity-70 backdrop-blur-md z-40 shadow-lg p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto flex justify-between items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-300",
                    children: "MyPortfolio"
                }, void 0, false, {
                    fileName: "[project]/components/Navbar.js",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "space-x-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "#about",
                            className: getLinkClass('#about'),
                            children: "About"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "#projects",
                            className: getLinkClass('#projects'),
                            children: "Projects"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "#skills",
                            className: getLinkClass('#skills'),
                            children: "Skills"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "#contact",
                            className: getLinkClass('#contact'),
                            children: "Contact"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
}),
"[externals]/next-seo/pages [external] (next-seo/pages, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("next-seo/pages");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/components/ScrollToTopButton.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ScrollToTopButton
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function ScrollToTopButton() {
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Show button when page is scrolled up to "showOffset"
    const toggleVisibility = ()=>{
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    // Set up scroll event listener
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        window.addEventListener('scroll', toggleVisibility);
        return ()=>{
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);
    // Scroll to top when button is clicked
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["AnimatePresence"], {
        children: isVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].button, {
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
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                className: "h-6 w-6",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/Certification.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Certification
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-intersection-observer [external] (react-intersection-observer, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function Certification() {
    const [ref, inView] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__["useInView"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        id: "certification",
        className: "bg-gray-900 py-16 px-4 text-white dark:bg-gray-800",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].h2, {
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
                    children: "Licenses & Certifications"
                }, void 0, false, {
                    fileName: "[project]/components/Certification.js",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                    ref: ref,
                    variants: variants,
                    initial: "hidden",
                    animate: inView ? "visible" : "hidden",
                    className: "bg-gray-800 p-8 rounded-lg shadow-xl dark:bg-gray-900 flex flex-col items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "relative w-full max-w-md h-auto mb-6 rounded-lg overflow-hidden border-2 border-blue-500 shadow-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/images/Certification_LEE_SANGHOON.JPEG",
                                alt: "정보처리기사 (한국산업인력공단)",
                                width: 700,
                                height: 500,
                                className: "object-contain"
                            }, void 0, false, {
                                fileName: "[project]/components/Certification.js",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Certification.js",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-semibold text-white mb-2",
                            children: "정보처리기사 (한국산업인력공단 | 2003년 취득)"
                        }, void 0, false, {
                            fileName: "[project]/components/Certification.js",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-md text-gray-400 text-center",
                            children: "IT 엔지니어링 및 시스템 설계 역량을 공인받은 국가기술자격."
                        }, void 0, false, {
                            fileName: "[project]/components/Certification.js",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Certification.js",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Certification.js",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Certification.js",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Hero$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Hero.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$About$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/About.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Projects.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skills$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Skills.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Contact$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Contact.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ThemeToggle$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ThemeToggle.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Navbar.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$seo$2f$pages__$5b$external$5d$__$28$next$2d$seo$2f$pages$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/next-seo/pages [external] (next-seo/pages, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScrollToTopButton$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ScrollToTopButton.js [ssr] (ecmascript)"); // Import ScrollToTopButton
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Certification$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Certification.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Hero$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$About$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skills$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Contact$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$seo$2f$pages__$5b$external$5d$__$28$next$2d$seo$2f$pages$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScrollToTopButton$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Certification$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Hero$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$About$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skills$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Contact$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$seo$2f$pages__$5b$external$5d$__$28$next$2d$seo$2f$pages$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScrollToTopButton$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Certification$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
;
function Home() {
    const seoTags = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$seo$2f$pages__$5b$external$5d$__$28$next$2d$seo$2f$pages$2c$__esm_import$29$__["generateNextSeo"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: seoTags
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ThemeToggle$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Hero$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$About$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skills$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Certification$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Contact$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScrollToTopButton$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            " "
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__be3621c3._.js.map