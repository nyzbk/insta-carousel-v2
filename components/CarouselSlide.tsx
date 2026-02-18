
import React, { useState, useEffect, useRef } from 'react';
import type { CarouselDesign, UserProfile } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { MoreHorizontalIcon } from './icons/MoreHorizontalIcon';
import { UploadIcon } from './icons/UploadIcon';
import { ShareIcon } from './icons/ShareIcon';
import { SaveIcon } from './icons/SaveIcon';
import { VerifiedIcon } from './icons/VerifiedIcon';

interface CarouselSlideProps {
  design: CarouselDesign;
  userProfile: UserProfile;
  isFirstPage?: boolean;
  isCtaPage?: boolean;
  title?: string;
  intro_paragraph?: string;
  points?: string[];
  blockquote_text?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  slideIndex: number;
  totalSlides: number;
  onUpdateContent: (field: string, value: any) => void;
}

const EditableText: React.FC<{
    value: string;
    onChange: (val: string) => void;
    className?: string;
    style?: React.CSSProperties;
    placeholder?: string;
}> = ({ value, onChange, className, style, placeholder }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resize = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    };

    useEffect(() => { resize(); }, [value]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => { onChange(e.target.value); resize(); }}
            rows={1}
            placeholder={placeholder}
            className={`bg-transparent border-none outline-none resize-none overflow-hidden w-full p-0 m-0 focus:ring-1 focus:ring-dashed focus:ring-gray-400/50 rounded-sm ${className}`}
            style={style}
        />
    );
};

// --- 1. JOURNAL DESIGN (iOS Style) ---
const JournalSlide: React.FC<Omit<CarouselSlideProps, 'design'>> = (props) => {
    const { isFirstPage, isCtaPage, title, intro_paragraph, points, blockquote_text, ctaTitle, ctaDescription, onUpdateContent } = props;
    
    return (
        <div className="w-[375px] h-[469px] bg-white text-[#1c1c1e] font-sans overflow-hidden relative flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 relative z-10 shrink-0">
                <div className="flex items-center gap-1 text-[#E0B038]">
                    <ArrowLeftIcon />
                    <span className="text-[17px] font-normal leading-none">Назад</span>
                </div>
                 <div className="flex items-center space-x-5 text-[#E0B038]">
                     <div className="border border-[#E0B038] rounded-full w-6 h-6 flex items-center justify-center text-xs">
                         <span className="transform -rotate-90">↺</span>
                     </div>
                     <div className="border border-[#E0B038] rounded-full w-6 h-6 flex items-center justify-center text-xs">
                         <span className="transform rotate-90">↻</span>
                     </div>
                     <UploadIcon />
                     <div className="border border-[#E0B038] rounded-full w-6 h-6 flex items-center justify-center font-bold text-[10px] leading-none pb-1">
                        ...
                     </div>
                 </div>
            </div>

            <div className="px-6 pb-6 flex-1 flex flex-col relative z-10 font-['Inter'] overflow-hidden">
                {isFirstPage ? (
                    <div className="flex flex-col h-full justify-start pt-4">
                        <EditableText 
                            value={title || ''} 
                            onChange={(val) => onUpdateContent('title', val)}
                            className="text-[24px] font-bold leading-[1.2] text-[#1c1c1e] tracking-tight mb-4 font-['Inter']"
                        />
                        <div className="w-full h-px bg-gray-200 mb-6"></div>
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Пролистай вправо →</span>
                    </div>
                ) : isCtaPage ? (
                     <div className="flex flex-col h-full justify-center items-center text-center">
                        <EditableText 
                             value={ctaTitle || ''}
                             onChange={(val) => onUpdateContent('ctaTitle', val)}
                             className="text-[26px] font-bold mb-6 text-[#1c1c1e] text-center leading-tight text-red-600"
                        />
                        <div className="w-16 h-1 bg-gray-200 rounded-full mb-8"></div>
                        <EditableText 
                            value={ctaDescription || ''}
                            onChange={(val) => onUpdateContent('ctaDescription', val)}
                            className="text-lg text-gray-700 leading-relaxed text-center max-w-[320px]"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col h-full">
                        <div className="shrink-0 mb-3">
                            <EditableText 
                                value={title || ''}
                                onChange={(val) => onUpdateContent('title', val)}
                                className="text-[20px] font-bold text-[#1c1c1e] leading-[1.2] font-['Inter'] mb-2"
                            />
                             {intro_paragraph && (
                                 <EditableText 
                                    value={intro_paragraph}
                                    onChange={(val) => onUpdateContent('intro_paragraph', val)}
                                    className="text-[14px] text-gray-700 leading-normal"
                                />
                             )}
                        </div>
                        <div className="flex-grow flex flex-col justify-start gap-3 mb-3 overflow-y-auto no-scrollbar min-h-0">
                            {points?.map((point, i) => (
                                <div key={i} className="flex items-start text-[13px] text-[#1c1c1e] leading-snug">
                                    <span className="text-[#1c1c1e] mr-3 mt-1.5 w-1.5 h-1.5 bg-[#1c1c1e] rounded-full shrink-0"></span>
                                    <EditableText 
                                        value={point}
                                        onChange={(val) => {
                                            const newPoints = [...(points || [])];
                                            newPoints[i] = val;
                                            onUpdateContent('points', newPoints);
                                        }}
                                        className=""
                                    />
                                </div>
                            ))}
                        </div>
                        {blockquote_text && (
                             <div className="shrink-0 mt-auto border-l-[3px] border-[#C5C5C7] pl-4 py-2">
                                 <div className="text-[13px] text-gray-600 leading-snug font-medium">
                                    <EditableText 
                                        value={blockquote_text}
                                        onChange={(val) => onUpdateContent('blockquote_text', val)}
                                    />
                                 </div>
                             </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// --- 2. NOTES DESIGN (Classic Apple Notes) ---
const NotesSlide: React.FC<Omit<CarouselSlideProps, 'design'>> = (props) => {
    const { isFirstPage, isCtaPage, title, intro_paragraph, points, blockquote_text, ctaTitle, ctaDescription, onUpdateContent, userProfile } = props;
    
    return (
        <div className="w-[375px] h-[469px] bg-[#FBFBF8] text-[#2D2D2D] font-sans overflow-hidden relative flex flex-col shadow-2xl">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`}}></div>
            
            <div className="flex items-center justify-between p-5 text-amber-500 relative z-10 shrink-0">
                <div className="flex items-center text-sm font-medium cursor-default">
                    <ArrowLeftIcon />
                    <span className="ml-1 truncate max-w-[150px]">Заметки</span>
                </div>
                 <div className="flex space-x-4">
                     <UploadIcon />
                     <MoreHorizontalIcon />
                 </div>
            </div>

            <div className="px-8 pt-2 pb-8 flex-1 flex flex-col relative z-10 font-['Inter'] overflow-hidden">
                {isFirstPage ? (
                    <div className="flex flex-col h-full justify-start pt-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Сегодня, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        <EditableText 
                            value={title || ''} 
                            onChange={(val) => onUpdateContent('title', val)}
                            className="text-2xl font-extrabold leading-tight text-[#2D2D2D] tracking-tight mb-6 font-['Montserrat']"
                        />
                        <div className="w-12 h-1 bg-amber-500/30 rounded-full mb-6"></div>
                         <p className="text-xs text-gray-400">@{userProfile.handle.replace('@', '')}</p>
                    </div>
                ) : isCtaPage ? (
                     <div className="flex flex-col h-full justify-center items-center text-center">
                        <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-5 text-2xl">✍️</div>
                        <EditableText 
                             value={ctaTitle || ''}
                             onChange={(val) => onUpdateContent('ctaTitle', val)}
                             className="text-2xl font-bold mb-3 text-[#2D2D2D] text-center font-['Montserrat']"
                        />
                        <EditableText 
                            value={ctaDescription || ''}
                            onChange={(val) => onUpdateContent('ctaDescription', val)}
                            className="text-sm text-gray-500 leading-relaxed text-center max-w-[260px]"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col h-full">
                        <EditableText 
                            value={title || ''}
                            onChange={(val) => onUpdateContent('title', val)}
                            className="text-lg font-bold text-[#2D2D2D] mb-4 leading-tight font-['Montserrat'] shrink-0"
                        />
                         {intro_paragraph && (
                             <EditableText 
                                value={intro_paragraph}
                                onChange={(val) => onUpdateContent('intro_paragraph', val)}
                                className="text-sm text-gray-600 leading-normal mb-5 shrink-0"
                            />
                         )}
                         <div className="flex-grow flex flex-col gap-3 overflow-y-auto no-scrollbar">
                            {points?.map((point, i) => (
                                <div key={i} className="flex items-start text-sm text-[#2D2D2D]">
                                    <span className="text-amber-500 mr-2.5 mt-1 shrink-0">•</span>
                                    <EditableText 
                                        value={point}
                                        onChange={(val) => {
                                            const newPoints = [...(points || [])];
                                            newPoints[i] = val;
                                            onUpdateContent('points', newPoints);
                                        }}
                                        className=""
                                    />
                                </div>
                            ))}
                        </div>
                         {blockquote_text && (
                             <div className="shrink-0 mt-auto pt-4">
                                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                                    <EditableText 
                                        value={blockquote_text}
                                        onChange={(val) => onUpdateContent('blockquote_text', val)}
                                        className="text-xs text-gray-600 italic text-center"
                                    />
                                </div>
                             </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- 3. MINIMAL DARK DESIGN (Editorial Psychology Style) ---
const MinimalDarkSlide: React.FC<Omit<CarouselSlideProps, 'design'>> = (props) => {
    const { isFirstPage, isCtaPage, title, intro_paragraph, points, blockquote_text, ctaTitle, ctaDescription, slideIndex, totalSlides, onUpdateContent, userProfile } = props;
    
    return (
        <div className="w-[375px] h-[469px] bg-black text-white font-sans overflow-hidden relative flex flex-col shadow-2xl border border-gray-800">
            {/* Pagination (Top Right) */}
            <div className="absolute top-5 right-5 text-xs font-bold text-gray-300 z-20">
                {slideIndex + 1}/{totalSlides}
            </div>

            {/* User Avatar Background for Cover Slide */}
            {isFirstPage && userProfile.avatarUrl && (
                <div className="absolute inset-0 z-0">
                    <img src={userProfile.avatarUrl} alt="bg" className="w-full h-full object-cover opacity-100" />
                    {/* Lighter overlays for better visibility */}
                    <div className="absolute inset-0 bg-black/5"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                </div>
            )}

            <div className="flex-1 flex flex-col relative z-10 font-['Inter'] overflow-hidden p-6">
                {isFirstPage ? (
                    <div className="flex flex-col h-full justify-end pb-16">
                        <EditableText 
                            value={title || ''} 
                            onChange={(val) => onUpdateContent('title', val)}
                            className="text-[24px] font-bold leading-[1.1] text-white tracking-tight mb-4 font-['Inter'] drop-shadow-lg"
                        />
                    </div>
                ) : isCtaPage ? (
                     <div className="flex flex-col h-full pt-10">
                        <EditableText 
                             value={ctaTitle || ''}
                             onChange={(val) => onUpdateContent('ctaTitle', val)}
                             className="text-[24px] font-bold mb-6 text-white leading-tight font-['Inter']"
                        />
                        <div className="text-[15px] text-gray-300 leading-relaxed">
                            <EditableText 
                                value={ctaDescription || ''}
                                onChange={(val) => onUpdateContent('ctaDescription', val)}
                            />
                        </div>
                        
                        <div className="mt-auto mb-14 bg-[#1A1A1A] p-5 rounded-lg border-l-2 border-white">
                             <p className="text-sm text-gray-300 font-medium">
                                 {userProfile.name ? userProfile.name : 'Автор'}
                             </p>
                             <p className="text-xs text-gray-500 mt-1">
                                 {userProfile.handle}
                             </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-full pt-6 pb-14">
                        <div className="shrink-0 mb-5">
                            <EditableText 
                                value={title || ''}
                                onChange={(val) => onUpdateContent('title', val)}
                                className="text-[22px] font-bold text-white leading-[1.2] font-['Inter'] mb-3"
                            />
                             {intro_paragraph && (
                                 <EditableText 
                                    value={intro_paragraph}
                                    onChange={(val) => onUpdateContent('intro_paragraph', val)}
                                    className="text-[15px] text-gray-300 leading-relaxed"
                                />
                             )}
                        </div>
                        <div className="flex-grow flex flex-col justify-start gap-4 mb-4 overflow-y-auto no-scrollbar min-h-0">
                            {points?.map((point, i) => (
                                <div key={i} className="flex flex-col text-[15px] text-white leading-snug">
                                    <EditableText 
                                        value={point}
                                        onChange={(val) => {
                                            const newPoints = [...(points || [])];
                                            newPoints[i] = val;
                                            onUpdateContent('points', newPoints);
                                        }}
                                        className=""
                                    />
                                </div>
                            ))}
                        </div>
                        {blockquote_text && (
                             <div className="shrink-0 mt-auto bg-[#1A1A1A] p-4 rounded-lg border-l-2 border-white">
                                 <div className="text-[14px] text-white leading-snug font-medium">
                                    <EditableText 
                                        value={blockquote_text}
                                        onChange={(val) => onUpdateContent('blockquote_text', val)}
                                    />
                                 </div>
                             </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="absolute bottom-0 left-0 right-0 h-[50px] border-t border-white/20 flex items-center justify-between px-5 bg-black z-20">
                {isFirstPage ? (
                    <>
                         <div className="flex items-center gap-2">
                            {userProfile.avatarUrl ? (
                                <img src={userProfile.avatarUrl} className="w-6 h-6 rounded-full object-cover border border-gray-700" alt="" />
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-gray-800"></div>
                            )}
                            <span className="text-xs font-bold text-white">{userProfile.handle.replace('@', '')}</span>
                            <VerifiedIcon className="w-3 h-3 text-blue-500" />
                         </div>
                         <div className="flex items-center gap-2 text-white">
                             <span className="text-[11px] font-medium">Сохранить</span>
                             <SaveIcon />
                         </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2 text-white">
                            <ShareIcon />
                            <span className="text-[11px] font-medium">Поделиться</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                             <span className="text-[11px] font-medium">Сохранить</span>
                             <SaveIcon />
                         </div>
                    </>
                )}
            </div>
        </div>
    );
};

// --- 4. INFLUENCER DESIGN (Personal Brand Style) ---
const InfluencerSlide: React.FC<Omit<CarouselSlideProps, 'design'>> = (props) => {
    const { isFirstPage, isCtaPage, title, intro_paragraph, points, blockquote_text, ctaTitle, ctaDescription, slideIndex, totalSlides, onUpdateContent, userProfile } = props;
    
    return (
        <div className="w-[375px] h-[469px] bg-[#111] text-white font-sans overflow-hidden relative flex flex-col shadow-2xl select-none">
            {/* Background Image */}
            {userProfile.avatarUrl && (
                <div className="absolute inset-0 z-0">
                    <img 
                        src={userProfile.avatarUrl} 
                        alt="Background" 
                        className="w-full h-full object-cover" 
                    />
                     {/* Gradient Overlay for readability */}
                     {isFirstPage ? (
                         <>
                             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/95"></div>
                             <div className="absolute inset-0 bg-black/10"></div>
                         </>
                     ) : (
                         <div className="absolute inset-0 bg-black/85"></div>
                     )}
                </div>
            )}

            {/* Header Area - Only for internal pages */}
            {!isFirstPage && (
                <div className="relative z-10 px-6 pt-6">
                     <div className="inline-block">
                        <p className="text-[13px] font-medium tracking-wide text-gray-200 mb-1">
                            {userProfile.handle}
                        </p>
                        <div className="w-[120%] h-[2px] bg-white/90"></div>
                     </div>
                </div>
            )}

            {/* Main Content */}
            <div className="relative z-10 flex-1 px-6 flex flex-col overflow-hidden">
                {isFirstPage ? (
                    <div className="flex flex-col justify-end h-full pb-6">
                        <EditableText 
                            value={title || ''} 
                            onChange={(val) => onUpdateContent('title', val)}
                            className="text-[24px] font-extrabold leading-[1.05] text-white uppercase tracking-tight text-left drop-shadow-2xl font-['Inter']"
                            placeholder="ЗАГОЛОВОК..."
                        />
                    </div>
                ) : isCtaPage ? (
                     <div className="flex flex-col h-full justify-center pt-6">
                         <EditableText 
                             value={ctaTitle || ''}
                             onChange={(val) => onUpdateContent('ctaTitle', val)}
                             className="text-[24px] font-bold text-white uppercase leading-tight mb-5"
                        />
                        <div className="p-4 border-l-2 border-white bg-white/5 backdrop-blur-sm">
                            <EditableText 
                                value={ctaDescription || ''}
                                onChange={(val) => onUpdateContent('ctaDescription', val)}
                                className="text-[16px] text-gray-200 italic leading-relaxed"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-full">
                        <div className="shrink-0 mb-5">
                            <EditableText 
                                value={title || ''}
                                onChange={(val) => onUpdateContent('title', val)}
                                className="text-[22px] font-bold text-white leading-tight font-['Inter'] mb-3"
                            />
                             {intro_paragraph && (
                                 <EditableText 
                                    value={intro_paragraph}
                                    onChange={(val) => onUpdateContent('intro_paragraph', val)}
                                    className="text-[16px] text-gray-200 leading-snug font-normal"
                                />
                             )}
                        </div>
                        
                        <div className="flex-grow flex flex-col justify-start gap-4 overflow-y-auto no-scrollbar">
                            {points?.map((point, i) => (
                                <div key={i} className="text-[16px] text-gray-200 font-normal leading-snug">
                                    <EditableText 
                                        value={point}
                                        onChange={(val) => {
                                            const newPoints = [...(points || [])];
                                            newPoints[i] = val;
                                            onUpdateContent('points', newPoints);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                         {blockquote_text && (
                             <div className="shrink-0 mt-auto pt-4">
                                <div className="bg-[#1A1A1A] border-l-4 border-gray-400 p-4 rounded-r-md">
                                    <EditableText 
                                        value={blockquote_text}
                                        onChange={(val) => onUpdateContent('blockquote_text', val)}
                                        className="text-[15px] text-gray-200 font-medium leading-snug"
                                    />
                                </div>
                             </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="relative z-20 mt-auto">
                <div className="h-px w-full bg-white/30 mb-3 mx-6 w-[calc(100%-48px)]"></div>
                <div className="flex items-center justify-between px-6 pb-5 text-white">
                    {isFirstPage ? (
                        <>
                            <div className="flex items-center gap-2">
                                {userProfile.avatarUrl ? (
                                    <img src={userProfile.avatarUrl} className="w-8 h-8 rounded-full object-cover border-2 border-black" />
                                ) : (
                                     <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-black"></div>
                                )}
                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-bold">{userProfile.handle.replace('@','')}</span>
                                    <VerifiedIcon className="w-4 h-4 text-blue-500" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-300">Сохрани</span>
                                <SaveIcon />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-4">
                                <div className="transform rotate-[-15deg]">
                                    <ShareIcon />
                                </div>
                                <span className="text-[10px] font-bold font-mono tracking-widest">
                                    {slideIndex + 1}/{totalSlides}
                                </span>
                            </div>
                            <div>
                                <SaveIcon />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


export const CarouselSlide: React.FC<CarouselSlideProps> = (props) => {
    const { design, ...rest } = props;
    
    switch (design) {
        case 'journal': return <JournalSlide {...rest} />;
        case 'notes': return <NotesSlide {...rest} />;
        case 'minimal_dark': return <MinimalDarkSlide {...rest} />;
        case 'influencer': return <InfluencerSlide {...rest} />;
        default: return <NotesSlide {...rest} />;
    }
};
