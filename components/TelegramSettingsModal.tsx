
import React, { useState, useEffect } from 'react';
import { Spinner } from './Spinner';

interface TelegramSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSend: (token: string, chatId: string) => void;
    isSending: boolean;
}

export const TelegramSettingsModal: React.FC<TelegramSettingsModalProps> = ({ isOpen, onClose, onSend, isSending }) => {
    const [token, setToken] = useState('');
    const [chatId, setChatId] = useState('');
    
    useEffect(() => {
        const savedToken = localStorage.getItem('telegram_bot_token');
        const savedChatId = localStorage.getItem('telegram_chat_id');
        if (savedToken) setToken(savedToken);
        if (savedChatId) setChatId(savedChatId);
    }, []);

    const handleSaveAndSend = () => {
        if (!token || !chatId) return;
        const cleanToken = token.trim();
        const cleanChatId = chatId.trim();
        localStorage.setItem('telegram_bot_token', cleanToken);
        localStorage.setItem('telegram_chat_id', cleanChatId);
        onSend(cleanToken, cleanChatId);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg border border-gray-700 shadow-2xl transform transition-all">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white">Отправка в Telegram</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="token">
                            Bot Token
                        </label>
                        <input
                            id="token"
                            type="password"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            placeholder="123456789:ABCdefGHIjklMNOpqrs..."
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Получите у <a href="https://t.me/BotFather" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">@BotFather</a>
                        </p>
                    </div>
                    
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="chatId">
                            Chat ID или @username канала
                        </label>
                        <input
                            id="chatId"
                            type="text"
                            value={chatId}
                            onChange={(e) => setChatId(e.target.value)}
                            className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            placeholder="@mychannel или ID чата"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Для лички: ваш ID (узнать в <a href="https://t.me/userinfobot" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">@userinfobot</a>). Для канала: @username.
                        </p>
                    </div>

                    <div className="bg-gray-700/50 p-4 rounded-lg text-sm text-gray-300 space-y-2 border border-gray-600">
                        <p className="font-semibold text-yellow-400 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                            Если видите ошибку "Chat not found":
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>Если шлете <strong>себе</strong>: сначала нажмите <strong>/start</strong> в боте.</li>
                            <li>Если шлете <strong>в канал</strong>: сделайте бота <strong>Администратором</strong>.</li>
                            <li>Проверьте, что в токене и ID нет лишних пробелов.</li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded text-gray-300 hover:bg-gray-700 transition-colors"
                        disabled={isSending}
                    >
                        Отмена
                    </button>
                    <button
                        onClick={handleSaveAndSend}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded flex items-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        disabled={!token || !chatId || isSending}
                    >
                        {isSending ? (
                            <>
                                <Spinner />
                                <span className="ml-2">Отправка...</span>
                            </>
                        ) : (
                            'Отправить'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
