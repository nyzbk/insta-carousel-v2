
import React from 'react';
import type { CarouselDesign } from '../types';

interface DesignPickerProps {
    selectedDesign: CarouselDesign;
    onSelectDesign: (design: CarouselDesign) => void;
}

const designs: { id: CarouselDesign; name: string; classes: string; textColor: string }[] = [
    { 
        id: 'journal', 
        name: 'iOS Journal', 
        classes: 'bg-white border-gray-200',
        textColor: 'text-gray-900'
    },
    { 
        id: 'notes', 
        name: 'Classic Notes', 
        classes: 'bg-[#FBFBF8] border-amber-200',
        textColor: 'text-gray-800'
    },
    { 
        id: 'minimal_dark', 
        name: 'Dark Editorial', 
        classes: 'bg-black border-gray-800',
        textColor: 'text-white'
    },
    { 
        id: 'influencer', 
        name: 'Personal Brand', 
        classes: 'bg-[#111] border-gray-700',
        textColor: 'text-white'
    },
];

export const DesignPicker: React.FC<DesignPickerProps> = ({ selectedDesign, onSelectDesign }) => {
    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
                Выберите стиль дизайна
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {designs.map((design) => (
                    <button
                        key={design.id}
                        onClick={() => onSelectDesign(design.id)}
                        className={`group relative w-full aspect-video rounded-xl overflow-hidden transition-all duration-300 ${
                            selectedDesign === design.id 
                            ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-800 scale-105 shadow-xl' 
                            : 'hover:opacity-90 hover:scale-102'
                        }`}
                    >
                        <div className={`w-full h-full flex flex-col items-center justify-center p-2 ${design.classes}`}>
                            <span className={`text-2xl font-bold mb-1 ${design.textColor}`}>Aa</span>
                             <span className={`text-[10px] md:text-xs font-semibold px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm whitespace-nowrap ${design.textColor}`}>
                                {design.name}
                            </span>
                        </div>
                        
                        {/* Selection Indicator */}
                        {selectedDesign === design.id && (
                            <div className="absolute top-2 right-2 bg-purple-500 rounded-full p-1 shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};