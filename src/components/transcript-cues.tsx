import React, { useState, createContext, useContext, useMemo, useCallback } from 'react';
import { Search, MessageSquare, X, Send } from 'lucide-react';

// --- INTERFACES AND MOCK DATA SETUP ---

interface TranscriptLine {
    type: string;
    transcript: string[];
}

interface AICue {
    id: number;
    header: string;
    data: { id: number; text: string }[];
}

interface AICuesGroup {
    type: string;
    cues: AICue[];
}

interface FeedbackItem {
    id: number;
    dev: string; // Mock developer name
    text: string;
    timestamp: Date;
}

// Mock initial Transcript data
const initialTranscription: TranscriptLine[] = [
    {
        type: 'Basic Info',
        transcript: [
            'Hi, my name is Varun.',
            'I currently live in Hyderabad.',
            'I work as a software developer.',
        ],
    },
    {
        type: 'Health Profile',
        transcript: ['I consume Alcohol Daily', 'I have ADHD', 'text3'],
    },
];

// Mock initial AI Cues data structure
const initialAICues: AICuesGroup[] = [
    {
        type: 'Basic Info',
        cues: [
            { id: 101, header: 'Location Extracted', data: [{ id: 1, text: 'City: Hyderabad' }, { id: 2, text: 'Country: India' }] },
            { id: 102, header: 'Role Identified', data: [{ id: 3, text: 'Occupation: Software Developer' }] },
        ],
    },
    {
        type: 'Health Profile',
        cues: [
            { id: 201, header: 'Risk Factor Detected', data: [{ id: 4, text: 'High Alcohol Consumption' }] },
            { id: 202, header: 'Medical Condition', data: [{ id: 5, text: 'Diagnosis: ADHD' }] },
        ],
    },
];


// Mock persistent feedback data stores (In-memory)
const initialTranscriptFeedback: Record<string, FeedbackItem[]> = {
    'I consume Alcohol Daily': [
        { id: 1, dev: 'Alice', text: 'Flagged as potential PII. Needs explicit consent check for this type of data.', timestamp: new Date(Date.now() - 3600000) },
    ],
    'I currently live in Hyderabad.': [
        { id: 2, dev: 'Bob', text: 'Verified entity extraction is correct for city name.', timestamp: new Date(Date.now() - 7200000) },
    ],
};

const initialCueFeedback: Record<string, FeedbackItem[]> = {
    'Risk Factor Detected': [
        { id: 4, dev: 'Grace', text: 'Severity level set to Medium. Review required.', timestamp: new Date(Date.now() - 5000000) },
    ],
};


const DataContext = createContext<{ transcription: TranscriptLine[], aiCues: AICuesGroup[] } | undefined>(undefined);

const DataWrapper = ({ children }: { children: React.ReactNode }) => {
    const data = useMemo(() => ({
        transcription: initialTranscription,
        aiCues: initialAICues
    }), []);
    return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataWrapper');
    }
    return context;
};

// --- COMMON FEEDBACK UTILITIES ---

const formatDate = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) +
           ' - ' + date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    lineType: string;
    feedbackKey: string;
    allFeedback: Record<string, FeedbackItem[]>;
    onNewFeedback: (key: string, feedback: FeedbackItem) => void;
}

// Helper to render the feedback list (used in both modals)
const FeedbackList: React.FC<{ currentFeedback: FeedbackItem[] }> = ({ currentFeedback }) => (
    <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <h4 className="text-sm font-bold text-gray-700 sticky top-0 bg-white pb-2 border-b">
            Existing Feedback ({currentFeedback.length})
        </h4>
        {currentFeedback.length === 0 ? (
            <p className="text-sm text-gray-500 italic text-center py-4">No feedback submitted yet for this item.</p>
        ) : (
            currentFeedback
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()) // Newest first
                .map((feedback) => (
                    <div key={feedback.id} className="bg-gray-100 p-3 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                            <span className="font-semibold text-gray-700">{feedback.dev}</span>
                            <span>{formatDate(feedback.timestamp)}</span>
                        </div>
                        <p className="text-sm text-gray-800">{feedback.text}</p>
                    </div>
                ))
        )}
    </div>
);

// Helper for the submission form (used in both modals)
const FeedbackForm: React.FC<{ onSubmit: (text: string) => void }> = ({ onSubmit }) => {
    const [feedbackText, setFeedbackText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedbackText.trim()) return;
        onSubmit(feedbackText.trim());
        setFeedbackText('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 border-t bg-gray-50 rounded-b-xl">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Submit New Feedback</h4>
            <div className="flex items-end space-x-2">
                <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    rows={3}
                    placeholder="Type your feedback here..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-indigo-500 focus:border-indigo-500 transition shadow-inner"
                />
                <button
                    type="submit"
                    disabled={!feedbackText.trim()}
                    className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition disabled:bg-indigo-300 disabled:cursor-not-allowed transform hover:scale-105"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </form>
    );
};


// --- TRANSCRIPT FEEDBACK MODAL (Distinct Design 1: Blue/Green Accent) ---

interface TranscriptModalProps extends BaseModalProps {
    transcriptLine: string; // Specific prop for this modal
}

const TranscriptFeedbackModal: React.FC<TranscriptModalProps> = ({
    isOpen,
    onClose,
    transcriptLine,
    lineType,
    feedbackKey,
    allFeedback,
    onNewFeedback,
}) => {
    if (!isOpen) return null;

    const currentFeedback = allFeedback[feedbackKey] || [];

    const handleSubmission = (text: string) => {
        const newFeedback: FeedbackItem = {
            id: Date.now(),
            dev: 'Current Developer',
            text: text,
            timestamp: new Date(),
        };
        onNewFeedback(feedbackKey, newFeedback);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col transform transition-all duration-300 scale-100">
                {/* Modal Header (Blue accent) */}
                <div className="p-5 border-b flex justify-between items-center bg-blue-600 text-white rounded-t-xl">
                    <h3 className="text-xl font-bold">Transcript Feedback</h3>
                    <button onClick={onClose} className="text-blue-200 hover:text-white transition p-1 rounded-full hover:bg-blue-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Context (Light Blue) */}
                <div className="p-5 bg-blue-50 border-b">
                    <p className="text-xs font-semibold uppercase text-blue-700 mb-1">Source: {lineType} / Transcript Line</p>
                    <p className="text-base font-medium italic text-gray-700 leading-snug">
                        "{transcriptLine}"
                    </p>
                </div>

                <FeedbackList currentFeedback={currentFeedback} />
                <FeedbackForm onSubmit={handleSubmission} />
            </div>
        </div>
    );
};


// --- AI CUE FEEDBACK MODAL (Distinct Design 2: Purple/Pink Accent) ---

interface AICueModalProps extends BaseModalProps {
    cueHeader: string; // Specific prop for this modal
}

const AICueFeedbackModal: React.FC<AICueModalProps> = ({
    isOpen,
    onClose,
    cueHeader,
    lineType,
    feedbackKey,
    allFeedback,
    onNewFeedback,
}) => {
    if (!isOpen) return null;

    const currentFeedback = allFeedback[feedbackKey] || [];

    const handleSubmission = (text: string) => {
        const newFeedback: FeedbackItem = {
            id: Date.now(),
            dev: 'Current Developer',
            text: text,
            timestamp: new Date(),
        };
        onNewFeedback(feedbackKey, newFeedback);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col transform transition-all duration-300 scale-100">
                {/* Modal Header (Purple accent) */}
                <div className="p-5 border-b flex justify-between items-center bg-purple-700 text-white rounded-t-xl">
                    <h3 className="text-xl font-bold">AI Cue Quality Feedback</h3>
                    <button onClick={onClose} className="text-purple-300 hover:text-white transition p-1 rounded-full hover:bg-purple-800">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Context (Pink Accent with border) */}
                <div className="p-5 bg-pink-50 border-b border-pink-200">
                    <p className="text-xs font-bold uppercase text-purple-700 mb-1">Source: {lineType} / AI Cue Header</p>
                    <div className="bg-white p-3 rounded-lg border-l-4 border-pink-400">
                        <p className="text-base font-semibold text-gray-800 leading-snug">
                            "{cueHeader}"
                        </p>
                    </div>
                </div>

                <FeedbackList currentFeedback={currentFeedback} />
                <FeedbackForm onSubmit={handleSubmission} />
            </div>
        </div>
    );
};


// --- TRANSCRIPT PANEL COMPONENT ---

export function TranscriptPanel() {
    const { transcription } = useData();
    const [query, setQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLineContext, setSelectedLineContext] = useState<{ line: string, type: string } | null>(null);
    const [allFeedback, setAllFeedback] = useState<Record<string, FeedbackItem[]>>(initialTranscriptFeedback);

    const transcriptMessages: TranscriptLine[] = transcription.length > 0 ? transcription : initialTranscription;

    // Filter messages based on query
    const filteredMessages = useMemo(() => {
        return transcriptMessages
            .map((group) => ({
                ...group,
                transcript: group.transcript.filter((line) =>
                    line.toLowerCase().includes(query.toLowerCase())
                ),
            }))
            .filter((group) => group.transcript.length > 0);
    }, [transcriptMessages, query]);

    const handleOpenModal = useCallback((line: string, type: string) => {
        setSelectedLineContext({ line, type });
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedLineContext(null);
    }, []);

    const handleNewFeedback = useCallback((line: string, newFeedback: FeedbackItem) => {
        setAllFeedback(prev => {
            const currentFeedback = prev[line] || [];
            return {
                ...prev,
                [line]: [...currentFeedback, newFeedback],
            };
        });
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 h-[550px] flex flex-col font-sans w-1/2 min-w-[400px]">
            {/* Header */}
            <div className="flex justify-between items-center mb-5 border-b pb-4">
                <h2 className="text-xl font-bold text-gray-800">
                    Interview Transcript
                </h2>
                <div className="relative w-60">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search transcript..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                </div>
            </div>

            {/* Transcript Section */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <style jsx="true">{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 8px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background-color: #d1d5db; /* gray-300 */
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                `}</style>
                <div className="flex flex-col gap-6">
                    {filteredMessages.length > 0 ? (
                        filteredMessages.map((group, index) => (
                            <div key={index} className="space-y-3">
                                <h3 className="font-bold text-lg text-purple-700 border-b border-purple-100 pb-1">
                                    {group.type}
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {group.transcript.map((line, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex justify-between items-center p-3 rounded-xl shadow-sm text-sm leading-relaxed transition ${
                                                group.type === 'Basic Info'
                                                    ? 'bg-blue-50 border-l-4 border-blue-400'
                                                    : 'bg-green-50 border-l-4 border-green-400'
                                            }`}
                                        >
                                            <span className="text-gray-800 flex-1 pr-4">{line}</span>
                                            <button
                                                onClick={() => handleOpenModal(line, group.type)}
                                                className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition duration-150 p-1 rounded-full hover:bg-white"
                                                title={`Add/View Feedback for: "${line}"`}
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                                <span className="text-xs font-medium min-w-[10px]">
                                                    ({allFeedback[line]?.length || 0})
                                                </span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm italic mt-4 p-4 text-center">
                            No transcript lines match your search query: "{query}"
                        </p>
                    )}
                </div>
            </div>

            {/* Transcript Feedback Modal (Specific component) */}
            {isModalOpen && selectedLineContext && (
                <TranscriptFeedbackModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    transcriptLine={selectedLineContext.line}
                    lineType={selectedLineContext.type}
                    feedbackKey={selectedLineContext.line}
                    allFeedback={allFeedback}
                    onNewFeedback={handleNewFeedback}
                />
            )}
        </div>
    );
}


// --- AI CUES PANEL COMPONENT ---
interface AICuesPanelProps {
    type: string;
}

export function AICuesPanel({ type }: AICuesPanelProps) {
    const { aiCues } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCueContext, setSelectedCueContext] = useState<{ header: string, type: string, key: string } | null>(null);
    const [allCueFeedback, setAllCueFeedback] = useState<Record<string, FeedbackItem[]>>(initialCueFeedback);

    const handleOpenModal = useCallback((header: string, type: string) => {
        setSelectedCueContext({ header, type, key: header }); // Using header as key for feedback
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedCueContext(null);
    }, []);

    const handleNewCueFeedback = useCallback((key: string, newFeedback: FeedbackItem) => {
        setAllCueFeedback(prev => {
            const currentFeedback = prev[key] || [];
            return {
                ...prev,
                [key]: [...currentFeedback, newFeedback],
            };
        });
    }, []);

    const selectedGroup = aiCues.find((item: AICuesGroup) => item.type === type);

    if (!selectedGroup) {
        return (
            <div className="bg-white rounded-2xl shadow-xl p-6 h-[550px] flex flex-col font-sans w-1/2 min-w-[400px]">
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-4">AI Cues - {type}</h2>
                <p className="text-gray-500 italic">No cues found for "{type}"</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 h-[550px] flex flex-col font-sans w-1/2 min-w-[400px]">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-4">AI Cues - {type}</h2>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-6">
                    {selectedGroup.cues.map((cue: AICue) => (
                        <div key={cue.id} className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-xl shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <p className="font-bold text-lg text-purple-800 flex-1 pr-4">{cue.header}</p>
                                <button
                                    onClick={() => handleOpenModal(cue.header, selectedGroup.type)}
                                    className="flex items-center space-x-1 text-gray-500 hover:text-pink-600 transition duration-150 p-1 rounded-full hover:bg-white"
                                    title={`Add/View Feedback for: "${cue.header}"`}
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    <span className="text-xs font-medium min-w-[10px]">
                                        ({allCueFeedback[cue.header]?.length || 0})
                                    </span>
                                </button>
                            </div>
                            <div className="space-y-1 mt-2">
                                {cue.data.map((d: any) => (
                                    <p key={d.id} className="text-gray-700 text-sm">
                                        • {d.text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Cues Feedback Modal (Specific component) */}
            {isModalOpen && selectedCueContext && (
                <AICueFeedbackModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    cueHeader={selectedCueContext.header}
                    lineType={selectedCueContext.type}
                    feedbackKey={selectedCueContext.key}
                    allFeedback={allCueFeedback}
                    onNewFeedback={handleNewCueFeedback}
                />
            )}
        </div>
    );
}

// Main App Component to satisfy single file React structure
export default function App() {
    // Inject Inter font styling
    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-wrap items-start justify-center gap-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            <DataWrapper>
                <TranscriptPanel />
                {/* Displaying AI Cues for the 'Basic Info' type */}
                <AICuesPanel type="Basic Info" />
            </DataWrapper>
        </div>
    );
}
