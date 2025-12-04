import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Certification() {
  const [showOriginal, setShowOriginal] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="certification" className="bg-gray-900 py-16 px-4 text-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Licenses & Certifications
        </motion.h2>
        <motion.div
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-gray-800 p-8 rounded-lg shadow-xl dark:bg-gray-900 flex flex-col items-center"
        >
          <div 
            className="relative mb-6 rounded-lg overflow-hidden border-2 border-blue-500 shadow-lg cursor-pointer group"
            style={{ width: 170, height: 120 }} // 작은 썸네일 사이즈
            onClick={() => setShowOriginal(true)}
            title="클릭 시 원본 보기"
          >
            {/* <Image
              src="/images/Certification_LEE_SANGHOON.JPEG"
              alt="정보처리기사 (한국산업인력공단)"
              width={170}
              height={120}
              className="object-contain transition-transform duration-200 group-hover:scale-105"
              style={{ objectFit: 'contain' }}
            /> */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 bg-black/60 transition-opacity duration-200 text-white font-semibold text-sm pointer-events-none select-none">
              원본 이미지 보기
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">정보처리기사 (한국산업인력공단 | 2003년 취득)</h3>
          <p className="text-md text-gray-400 text-center">
            IT 엔지니어링 및 시스템 설계 역량을 공인받은 국가기술자격.
          </p>
        </motion.div>
      </div>

      {/* 이미지 원본 레이어 */}
      {showOriginal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setShowOriginal(false)}
        >
          <div className="relative max-w-2xl w-full">
            <button
              className="absolute top-3 right-3 text-white text-3xl z-10"
              onClick={e => {
                e.stopPropagation();
                setShowOriginal(false);
              }}
              aria-label="닫기"
            >
              &times;
            </button>
            <div className="rounded-lg overflow-hidden bg-black flex items-center justify-center" style={{ minHeight: 300 }}>
              <Image
                src="/images/Certification_LEE_SANGHOON.JPEG"
                alt="정보처리기사 (한국산업인력공단)"
                width={900}
                height={650}
                className="object-contain"
                style={{ objectFit: 'contain', width: '100%', height: 'auto', maxHeight: '80vh', background: 'black' }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
