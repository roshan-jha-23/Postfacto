import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useData } from "../context/DataWrapper";

// --- MOCK DATA ---
const mockAiCuesData = [
    {
        type: "Transcription",
        cues: [
            {
                id: "cue-1-1",
                header: "Opening Statement Analysis",
                data: [
                    { id: "d-1-1", text: "Speaker seemed confident but spoke too quickly." },
                    { id: "d-1-2", text: "Mentioned key project goals early on." },
                ],
            },
            {
                id: "cue-1-2",
                header: "Pacing and Tone",
                data: [{ id: "d-2-1", text: "Vocal tone was positive and engaging." }],
            },
            {
                id: "cue-1-3",
                header: "Technical Jargon Usage",
                data: [{ id: "d-3-1", text: "Used the term 'API endpoint' correctly." }, { id: "d-3-2", text: "Could clarify what 'serverless architecture' means for stakeholders." }],
            },
        ],
    },
];

// Initial state for developer feedbacks
const initialFeedbacks = {
    "cue-1-1": [
        { id: 1, author: "Alex Doe", comment: "This cue was very helpful for analysis." },
        { id: 2, author: "Jane Smith", comment: "Could be more specific about the timing." }
    ]
};

// --- REACT COMPONENT ---

/**
 * A single React component that displays AI Cues and allows users to submit and view feedback.
 */
const AICuesWithFeedback = ({ type }) => {
    const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCue, setSelectedCue] = useState(null);
    
    const { aiCues}: any = useData();
    const [modelParams,setModelParams] = useState({isOpen:false,feedbacks:[],cue:'',tabType:type,timeStamp:''})

    console.log('aicues in new component',aiCues)
    // Extract the cues for easy rendering
    const transcriptionCues = useMemo(() => {
        return mockAiCuesData.find(item => item.type === "Transcription")?.cues || [];
    }, []);

    const selectedType = aiCues.find((item: any) => item.type === type);


    console.log('selectedType in new component',selectedType,type)
    // Memoized array of feedbacks for the currently selected cue
    const currentCueFeedbacks = useMemo(() => {
        // if (!selectedCue) return [];
        // return feedbacks[selectedCue.id] || [];
    }, [selectedCue, feedbacks]);

    // Handler to open the modal
    const openModal = useCallback((cue) => {
        setSelectedCue(cue);
        setIsModalOpen(true);
        //setFeedbackComment(''); // Clear previous input
    }, []);

    // Handler to close the modal
    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        // Delay clearing selectedCue to allow for transition if needed, but not strictly necessary here.
        // setSelectedCue(null);
    }, []);

    // Handler for feedback submission
    


    // useEffect(()=>{
    //     if(!selectedCue) return ;

    //     let group = aiCues.find(e=>e.type === selectedType.type)
    //     let cue = group.cues.find(e=>e.id===selectedCue.id)
    //     setSelectedCue(cue)

    //     //console.log('ai cues ',)
    //     console.log('selected cue useeffect runs',cue,aiCues)
    // },[aiCues,selectedType])


    useEffect(()=>{
        console.log('selected cue in ai-cues',selectedCue)
    },[selectedCue])
    // --- SUB-COMPONENTS (Render Helpers) ---

    

    

    // --- MAIN RENDER ---
    return (
        <div className="bg-gray-100 p-4 sm:p-8 font-sans min-h-screen">
            <main className="max-w-4xl mx-auto">
                {/* AI Cues Card */}
                <div id="ai-cues-container" className="bg-white rounded-2xl shadow-sm p-6 min-h-[550px]">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">AI-Cues - Transcription</h2>
                    <div className="space-y-4">
                        {selectedType?.cues?.map(cue => (
                            <CueCard key={cue.id} cue={cue} setModelParams={setModelParams} selectedType={selectedType} setSelectedCue={setSelectedCue}/>
                        ))}
                    </div>
                </div>
            </main>

            {/* Feedback Modal (Conditional Render) */}
            <FeedbackModal modelParams={modelParams} setModelParams={setModelParams}/>
        </div>
    );
};

export default AICuesWithFeedback;



// Renders a single AI Cue card
    const CueCard = ({ cue ,setModelParams,selectedType,setSelectedCue}) => {
        const feedbackCount = cue.feedbacks.length || 0;
        console.log('cueCard rerendered')
        return (
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm" >
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-medium text-blue-800 mb-2">{cue.header}</p>
                        {cue.data.map(d => (
                            <p key={d.id} className="text-gray-800 text-sm mb-1 ml-2">• {d.text}</p>
                        ))}
                    </div>
                    {/* Feedback Button */}
                    <button
                        onClick={() =>{
                            setModelParams(p=>{return {...p,isOpen:true,feedbacks:cue.feedbacks,timeStamp:'',tabType:selectedType.type,cueHeader:cue?.header,cueId:cue.id}});
                            //setSelectedCue(cue)
                        
                        }}
                        className="relative p-2 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        aria-label={`Open feedback for ${cue.header}`}
                        
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {cue.feedbacks.length > 0 && (
                            <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-blue-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full border-2 border-blue-50">
                                {cue.feedbacks.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        );
    };


// Renders the Feedback Modal
    function FeedbackModal({modelParams,setModelParams}:{modeParams:any}) {
        const [feedbackComment, setFeedbackComment] = useState('');
        const {aiCues,updateCuesFeedback } = useData()

        // useEffect(()=>{
        //     console.log('selected cue',selectedCue)
        // },[selectedCue])

        console.log('modelParams',modelParams)
        if (!modelParams.isOpen) return null;


        // const currentFeedbacks = useMemo(() => {
        // if (!modelParams.cueId) return [];

        // const typeGroup = aiCues.find(item => item.type === modelParams.tabType);
        // const cue = typeGroup?.cues.find(c => c.id === modelParams.cueId);
        // return cue?.feedbacks || [];
        // }, [aiCues, modelParams.tabType, modelParams.cueId]);


        const handleFeedbackSubmit = (event) => {


        let formObj = {
            "cue_id":"2025-09-18 12:30:03",
            feedback_id:"feedback_00cd",
            feedback:feedbackComment,
            timeStamp:'',
            name:'varun',
            type:modelParams.tabType
        }

        updateCuesFeedback(formObj)
        // event.preventDefault();
        // const comment = feedbackComment.trim();

        // if (comment && selectedCue) {
        //     const newFeedback = {
        //         id: Date.now(),
        //         // Hardcoded author as in the original JS
        //         author: "Current Developer",
        //         comment: comment,
        //     };

        //     setFeedbacks(prevFeedbacks => ({
        //         ...prevFeedbacks,
        //         [selectedCue.id]: [...(prevFeedbacks[selectedCue.id] || []), newFeedback],
        //     }));

        //     // Clear input after submission
        //     setFeedbackComment('');
        // }




    };


    function closeModal(){
        setModelParams(p=>{return {...p,isOpen:false} })
    }
        return (
            <div
                className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
                onClick={(e) => { if (e.target === e.currentTarget) closeModal()}} // Close on backdrop click
            >
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center mb-4 border-b pb-3">
                        <h3 className="text-lg font-bold text-gray-800">
                            Feedback for: "{modelParams?.cueHeader || ""}"
                        </h3>
                        <button
                            onClick={closeModal}
                            className="text-gray-400 hover:text-gray-700 text-2xl font-bold"
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Existing Feedbacks List */}
                    <div className="mb-6 h-48 overflow-y-auto pr-2">
                        <h4 className="text-md font-semibold text-gray-600 mb-3">Developer Feedback</h4>
                        <div className="space-y-3">
                            {modelParams.feedbacks.length === 0 ? (
                                <p className="text-sm text-gray-500 italic">No feedback has been submitted for this cue yet.</p>
                            ) : (
                                modelParams.feedbacks.map((fb,idx) => (
                                    <div key={idx} className="bg-gray-100 p-3 rounded-md">
                                        <p className="font-semibold text-sm text-gray-700">{fb.name}</p>
                                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{fb.feedback}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Feedback Submission Form */}
                    <div>
                        <label htmlFor="feedback-comment" className="block text-md font-semibold text-gray-600 mb-2">Share Your Feedback</label>
                        <textarea
                            id="feedback-comment"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            rows="4"
                            placeholder="What did you like or what could be improved?"
                            required
                            value={feedbackComment}
                            onChange={(e) => setFeedbackComment(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end items-center mt-4">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="mr-2 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                //type="submit"
                                onClick={(e)=>handleFeedbackSubmit(e)}
                                className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };