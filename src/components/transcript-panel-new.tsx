import React, { useState, createContext, useContext, useMemo, useCallback, useEffect } from 'react';
import { Search, MessageSquare, X, Send } from 'lucide-react';
import { useData as useDataTemp } from '../context/DataWrapper';
//import { useData } from "../context/DataWrapper"

// --- MOCK CONTEXT AND DATA SETUP ---
// NOTE: In a real application, replace this mock context with your actual DataWrapper
// and integrate Firebase/Firestore for persistent feedback storage as per best practices.

interface TranscriptLine {
    type: string;
    transcript: string[];
}

interface FeedbackItem {
    id: number;
    dev: string; // Mock developer name
    text: string;
    timestamp: Date;
}

// Mock initial data structure
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

// Mock persistent feedback data store (In-memory)
const initialFeedback: Record<string, FeedbackItem[]> = {
    'I consume Alcohol Daily': [
        { id: 1, dev: 'Alice', text: 'Flagged as potential PII. Needs explicit consent check for this type of data.', timestamp: new Date(Date.now() - 3600000) },
    ],
    'I currently live in Hyderabad.': [
        { id: 2, dev: 'Bob', text: 'Verified entity extraction is correct for city name.', timestamp: new Date(Date.now() - 7200000) },
        { id: 3, dev: 'Charlie', text: 'Tone analysis shows neutral sentiment for this line.', timestamp: new Date(Date.now() - 1800000) },
    ],
};

const DataContext = createContext<{ transcription: TranscriptLine[] } | undefined>(undefined);

const DataWrapper = ({ children }: { children: React.ReactNode }) => {
    // In a real app, transcription would come from a global state or API call
    const data = useMemo(() => ({ transcription: initialTranscription }), []);
    return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataWrapper');
    }
    return context;
};

// --- FEEDBACK MODAL COMPONENT ---

interface FeedbackModalProps {
    // isOpen: boolean;
    // onClose: () => void;
    // transcriptLine: string;
    // lineType: string;
    // allFeedback: Record<string, FeedbackItem[]>;
    // onNewFeedback: (line: string, feedback: FeedbackItem) => void;
}

const FeedbackModal = ({
    // isOpen,
    // onClose,
    // transcriptLine,
    // lineType,
    // allFeedback,
    // onNewFeedback,
    modelParams
}) => {
    const [feedbackText, setFeedbackText] = useState('');
    //const currentFeedback = allFeedback[transcriptLine] || [];
    const {topContainerRef,updateTranscriptionFeedback}= useDataTemp()

    //console.log('modelParams',modelParams)

    useEffect(()=>{
        
        modelParams.isOpen ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY='scroll' 
        console.log(topContainerRef.current.style.overflowY)

        return ()=>{
            document.body.style.overflowY='scroll' 
        }
    },[modelParams.isOpen])

    if (!modelParams.isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        // e.preventDefault();
        // if (!feedbackText.trim()) return;

        // // Mock submission logic
        // const newFeedback: FeedbackItem = {
        //     id: Date.now(), // Use timestamp as a unique ID
        //     dev: 'Current Developer', // In a real app, this would be the authenticated user's name
        //     text: feedbackText.trim(),
        //     timestamp: new Date(),
        // };

        // onNewFeedback(transcriptLine, newFeedback);
        // setFeedbackText('');

        let formObj = {
            "transcript_id":"uuidv0",
            feedback_id:"feedback_00c",
            feedback:feedbackText,
            timeStamp:'',
            name:'varun',
            type:modelParams.tabType
        }

        updateTranscriptionFeedback(formObj)
        //setFeedbackText('')
    };

    const formatDate = (date: Date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) +
               ' - ' + date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{backgroundColor:'rgba(0,0,0,0.5)',overflow:'hidden'}}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
                {/* Modal Header */}
                <div className="p-5 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Developer Feedback</h3>
                    <button  className="text-gray-400 hover:text-gray-600 transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Transcript Context */}
                <div className="p-5 bg-purple-50 border-b">
                    <p className="text-xs font-semibold uppercase text-purple-700 mb-1">{modelParams.tabType}</p>
                    <p className="text-base font-medium italic text-gray-700 leading-snug">
                        "{modelParams.transcript}"
                    </p>
                </div>

                {/* Feedback List (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    <h4 className="text-sm font-semibold text-gray-600 sticky top-0 bg-white pb-2 border-b">
                        Existing Feedback ({modelParams.feedbacks.length})
                    </h4>
                    {modelParams.feedbacks.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No feedback submitted yet for this line.</p>
                    ) : (
                        modelParams.feedbacks
                            //.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()) // Newest first
                            .map((feedback) => (
                                <div key={feedback.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                                        <span className="font-medium text-gray-700">{feedback.name}</span>
                                        <span>{formatDate(new Date(Date.now() - 7200000))}</span>
                                    </div>
                                    <p className="text-sm text-gray-800">{feedback.feedback}</p>
                                </div>
                            ))
                    )}
                </div>

                {/* Feedback Submission Form */}
                <div className="p-5 border-t bg-gray-50">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Submit New Feedback</h4>
                    <div className="flex items-end space-x-2">
                        <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            rows={3}
                            placeholder="Type your feedback here..."
                            className="flex-1 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-purple-500 focus:border-purple-500"
                        />
                        <button
                            //type="submit"
                            //disabled={}
                            onClick={()=>handleSubmit()}
                            className="p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition disabled:bg-purple-300 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- TRANSCRIPT PANEL COMPONENT ---

export function TranscriptPanel() {
    //const { transcription } = useData();
    const [query, setQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLine, setSelectedLine] = useState<{ line: string, type: string } | null>(null);
    const [allFeedback, setAllFeedback] = useState<Record<string, FeedbackItem[]>>(initialFeedback);
    const {transcription} = useDataTemp()

    const [modelParams,setModelParams] = useState({isOpen:false,feedbacks:[],transcript:'',tabType:'',timeStamp:''})
    //const transcriptMessages: TranscriptLine[] = transcription.length > 0 ? transcription : initialTranscription;
    
    //const {transcription as transcriptions} = useDataTemp()
    // Filter messages based on query
    
    // const filteredMessages = useMemo(() => {
    //     return transcriptMessages
    //         .map((group) => ({
    //             ...group,
    //             transcript: group.transcript.filter((line) =>
    //                 line.toLowerCase().includes(query.toLowerCase())
    //             ),
    //         }))
    //         .filter((group) => group.transcript.length > 0);
    // }, [transcriptMessages, query]);

    // console.log('filteredMessages',filteredMessages)

    const handleOpenModal = useCallback((line: string, type: string,feedbacks) => {
        setSelectedLine({ line, type });
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedLine(null);
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

    useEffect(()=>{
        console.log('modelParams',modelParams)
    },[modelParams])
    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col font-sans h-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-5 border-b pb-4" style={{height:'10%'}}>
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
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar" style={{overflowY:'scroll',height:'90%'}}>
                <style jsx="true">{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 8px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background-color: #d1d5db; /* gray-300 
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                `}</style>
                <div className="flex flex-col gap-6" style={{overflowY:'scroll',height:'max-content'}}>
                    {transcription.length > 0 ? (
                        transcription.map((group, index) => {
                            //console.log('group',group)
                            return <div key={index} className="space-y-3">
                                <h3 className="font-bold text-lg text-purple-700 pb-1">
                                    {group.type}
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {group.transcripts.map((transcript, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex justify-between items-center p-3 rounded-xl shadow-sm text-sm leading-relaxed transition ${
                                                group.type === 'Basic Info'
                                                    ? 'bg-blue-50 border-l-4 border-blue-400'
                                                    : 'bg-green-50 border-l-4 border-green-400'
                                            }`} 
                                            style={{minHeight:'4rem'}}
                                        >
                                            <span className="text-gray-800 flex-1 pr-4">{transcript?.text} </span>
                                            <div>
                                                <button
                                                    onClick={() => setModelParams(p=>{return {...p,isOpen:true,transcript:transcript.text,feedbacks:transcript.feedbacks,tabType:group.type}})}
                                                    className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition duration-150 p-1 rounded-full hover:bg-white"
                                                    title={`Add/View Feedback for: "${transcript?.text}"`}
                                                >
                                                    <MessageSquare className="w-4 h-4" />
                                                    <span className="text-xs font-medium min-w-[10px]">
                                                        ({transcript?.feedbacks?.length || 0})
                                                    </span>
                                                </button>
                                                <div style={{fontSize:'0.65rem'}}>
                                                    Oct 12 2025
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            })
                    ) : (
                        <p className="text-gray-500 text-sm italic mt-4 p-4 text-center">
                            No transcript lines match your search query: "{query}"
                        </p>
                    )}
                </div>
            </div>

            {/* Feedback Modal */}
            {modelParams.isOpen && (
                <FeedbackModal
                    modelParams = {modelParams}
                    // isOpen={isModalOpen}
                    // onClose={handleCloseModal}
                    // transcriptLine={selectedLine.line}
                    // lineType={selectedLine.type}
                    // //allFeedback={transcription}
                    // onNewFeedback={handleNewFeedback}
                />
            )}
        </div>
    );
}

// Main App Component to satisfy single file React structure
export default function App() {
    // Inject Inter font styling
    return (
        <div className="bg-gray-100 p-4 flex items-start justify-center h-full" style={{ fontFamily: 'Inter, sans-serif' }}>
            <DataWrapper>
                <TranscriptPanel />
            </DataWrapper>
        </div>
    );
}
  