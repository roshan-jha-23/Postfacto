import type { AssessmentItem, TranscriptEntry } from "./types"

// Helper Icons
const TargetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)
const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)
const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
)
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export const transcriptData: TranscriptEntry[] = [
  {
    "time": "00:24",
    "speaker": "Bibhuti Anand",
    "text": "Hi Ramese."
  },
  {
    "time": "00:24",
    "speaker": "Bibhuti Anand",
    "text": "Good afternoon."
  },
  {
    "time": "00:25",
    "speaker": "Bibhuti Anand",
    "text": "Hi Ajay."
  },
  {
    "time": "00:27",
    "speaker": "Bibhuti Anand",
    "text": "So we are ready."
  },
  {
    "time": "00:28",
    "speaker": "Bibhuti Anand",
    "text": "Please let us know when you want to start."
  },
  {
    "time": "00:35",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Give me a minute?"
  },
  {
    "time": "00:37",
    "speaker": "Bibhuti Anand",
    "text": "Sure."
  },
  {
    "time": "02:44",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Yeah, we can start."
  },
  {
    "time": "02:49",
    "speaker": "Bibhuti Anand",
    "text": "Sure."
  },
  {
    "time": "02:50",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so I'm going to share my screen."
  },
  {
    "time": "02:53",
    "speaker": "Bibhuti Anand",
    "text": "Yeah."
  },
  {
    "time": "02:57",
    "speaker": "Bibhuti Anand",
    "text": "Okay."
  },
  {
    "time": "02:58",
    "speaker": "Bibhuti Anand",
    "text": "And so in this call."
  },
  {
    "time": "03:01",
    "speaker": "Bibhuti Anand",
    "text": "We would first give you a demo of our real time AI assistant for telecallers."
  },
  {
    "time": "03:06",
    "speaker": "Bibhuti Anand",
    "text": "Then we would show you how the."
  },
  {
    "time": "03:08",
    "speaker": "Bibhuti Anand",
    "text": "Post facto review and analysis looks like."
  },
  {
    "time": "03:12",
    "speaker": "Bibhuti Anand",
    "text": "If we have time, we can also do a quick demo for voicebot."
  },
  {
    "time": "03:15",
    "speaker": "Bibhuti Anand",
    "text": "But let's start with the tele calling setup."
  },
  {
    "time": "03:21",
    "speaker": "Bibhuti Anand",
    "text": "This application that you see on the screen."
  },
  {
    "time": "03:26",
    "speaker": "Bibhuti Anand",
    "text": "This has been created for in person meetings, but it works for tele."
  },
  {
    "time": "03:30",
    "speaker": "Bibhuti Anand",
    "text": "Calling setup as well."
  },
  {
    "time": "03:32",
    "speaker": "Bibhuti Anand",
    "text": "UI and everything can be customized because of course you need to integrate the entire thing with your existing systems."
  },
  {
    "time": "03:39",
    "speaker": "Bibhuti Anand",
    "text": "Let's not bother about the ui."
  },
  {
    "time": "03:40",
    "speaker": "Bibhuti Anand",
    "text": "But the key thing here is."
  },
  {
    "time": "03:43",
    "speaker": "Bibhuti Anand",
    "text": "The system able to understand whatever question."
  },
  {
    "time": "03:46",
    "speaker": "Bibhuti Anand",
    "text": "I'm asking and is it able to."
  },
  {
    "time": "03:48",
    "speaker": "Bibhuti Anand",
    "text": "Generate the response within, let's say five millisecond, five seconds so that it can be used by the telecolla?"
  },
  {
    "time": "03:55",
    "speaker": "Bibhuti Anand",
    "text": "That is the primary thing that we want to show."
  },
  {
    "time": "03:57",
    "speaker": "Bibhuti Anand",
    "text": "And this particular demo had been created or this is actually in a pilot phase for an insurance client and there is nothing proprietary."
  },
  {
    "time": "04:07",
    "speaker": "Bibhuti Anand",
    "text": "It's our version so we can show it to you without any confidentiality issues."
  },
  {
    "time": "04:12",
    "speaker": "Bibhuti Anand",
    "text": "But yeah, the demo has been created for a health insurance client."
  },
  {
    "time": "04:15",
    "speaker": "Bibhuti Anand",
    "text": "So the questions that I'd be asking."
  },
  {
    "time": "04:18",
    "speaker": "Bibhuti Anand",
    "text": "Will be based on that knowledge bank."
  },
  {
    "time": "04:20",
    "speaker": "Bibhuti Anand",
    "text": "And if you want to test it, we can create a setup with any document that you want and then the."
  },
  {
    "time": "04:26",
    "speaker": "Bibhuti Anand",
    "text": "Entire thing can be tested."
  },
  {
    "time": "04:28",
    "speaker": "Bibhuti Anand",
    "text": "So let's start."
  },
  {
    "time": "04:29",
    "speaker": "Bibhuti Anand",
    "text": "I'll create a fresh lead just to show you know, in real time."
  },
  {
    "time": "04:36",
    "speaker": "Bibhuti Anand",
    "text": "Setup or in production."
  },
  {
    "time": "04:38",
    "speaker": "Bibhuti Anand",
    "text": "The telecollas won't need to do this because any customer detail will be captured directly from the database."
  },
  {
    "time": "04:44",
    "speaker": "Bibhuti Anand",
    "text": "But here we are just creating a new lead."
  },
  {
    "time": "04:46",
    "speaker": "Bibhuti Anand",
    "text": "So give me a second."
  },
  {
    "time": "04:51",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so I'm just putting some random data."
  },
  {
    "time": "04:55",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Before we start."
  },
  {
    "time": "04:56",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "I'll just reiterate what exactly we are looking for, so."
  },
  {
    "time": "05:01",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Oh, is it fine?"
  },
  {
    "time": "05:02",
    "speaker": "Bibhuti Anand",
    "text": "Yeah, yeah, please."
  },
  {
    "time": "05:04",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Yeah."
  },
  {
    "time": "05:04",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "So we have a call center team."
  },
  {
    "time": "05:06",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Okay."
  },
  {
    "time": "05:07",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Mainly we are looking this for the asset vertical, which includes all the loans."
  },
  {
    "time": "05:13",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "And we're looking for a solution which gives insights, consumer insights and you know, the, our team can, you know, pitch the relevant product accordingly so that our conversation looks more sharper."
  },
  {
    "time": "05:24",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "And apart from this, we are open to both."
  },
  {
    "time": "05:27",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "If the insights can on the insights, either bot can call or human can call."
  },
  {
    "time": "05:32",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "We are open to both."
  },
  {
    "time": "05:34",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "And we also, you know, can provide a data of X number of clients with history."
  },
  {
    "time": "05:42",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "And we want the solution to, you know, let us know which client to call immediately and they have a requirement on the side."
  },
  {
    "time": "05:49",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "So any questions on this?"
  },
  {
    "time": "05:52",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so please confirm my understanding."
  },
  {
    "time": "05:55",
    "speaker": "Bibhuti Anand",
    "text": "So what you want is AI system which should be able to review all the calls and it should be able."
  },
  {
    "time": "06:01",
    "speaker": "Bibhuti Anand",
    "text": "To generate insights from those calls."
  },
  {
    "time": "06:04",
    "speaker": "Bibhuti Anand",
    "text": "And it primarily you're targeting the lending vertical, so the insight should be relevant to that."
  },
  {
    "time": "06:13",
    "speaker": "Bibhuti Anand",
    "text": "And based on the insights, AI should."
  },
  {
    "time": "06:16",
    "speaker": "Bibhuti Anand",
    "text": "Be able to take a call."
  },
  {
    "time": "06:17",
    "speaker": "Bibhuti Anand",
    "text": "If there is a need for a."
  },
  {
    "time": "06:18",
    "speaker": "Bibhuti Anand",
    "text": "Follow up call or a qualification call."
  },
  {
    "time": "06:20",
    "speaker": "Bibhuti Anand",
    "text": "With the customer, then it should be able to do that."
  },
  {
    "time": "06:24",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Accordingly."
  },
  {
    "time": "06:27",
    "speaker": "Bibhuti Anand",
    "text": "Yes."
  },
  {
    "time": "06:27",
    "speaker": "Bibhuti Anand",
    "text": "And have a conversation with the user on that particular product."
  },
  {
    "time": "06:31",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Right."
  },
  {
    "time": "06:32",
    "speaker": "Bibhuti Anand",
    "text": "Okay."
  },
  {
    "time": "06:33",
    "speaker": "Bibhuti Anand",
    "text": "Okay."
  },
  {
    "time": "06:33",
    "speaker": "Bibhuti Anand",
    "text": "Where does real time assistance to the."
  },
  {
    "time": "06:35",
    "speaker": "Bibhuti Anand",
    "text": "Telecoller comes in the picture?"
  },
  {
    "time": "06:37",
    "speaker": "Bibhuti Anand",
    "text": "Are you looking for a solution which."
  },
  {
    "time": "06:38",
    "speaker": "Bibhuti Anand",
    "text": "Has both real time assistance and post facto analysis or is it that the post meeting, post call review is the primary requirement?"
  },
  {
    "time": "06:46",
    "speaker": "Bibhuti Anand",
    "text": "Now, right now post call review is."
  },
  {
    "time": "06:48",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Not the primary requirement either it's a real time assistant or before the call if someone can, you know, give some insights and that can really help."
  },
  {
    "time": "06:57",
    "speaker": "Bibhuti Anand",
    "text": "Okay, okay, got it."
  },
  {
    "time": "07:00",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so understood."
  },
  {
    "time": "07:02",
    "speaker": "Bibhuti Anand",
    "text": "This particular demo is set on an insurance knowledge bank."
  },
  {
    "time": "07:08",
    "speaker": "Bibhuti Anand",
    "text": "So that's the only thing that will be different."
  },
  {
    "time": "07:10",
    "speaker": "Bibhuti Anand",
    "text": "Otherwise the entire thing will remain same."
  },
  {
    "time": "07:11",
    "speaker": "Bibhuti Anand",
    "text": "And as a follow up we can."
  },
  {
    "time": "07:14",
    "speaker": "Bibhuti Anand",
    "text": "Also set up another call where we create a knowledge bank which is more relevant to the lending industry and accordingly we can show a demo."
  },
  {
    "time": "07:22",
    "speaker": "Bibhuti Anand",
    "text": "But yeah, with this demo you would."
  },
  {
    "time": "07:24",
    "speaker": "Bibhuti Anand",
    "text": "Get a sense that how does that."
  },
  {
    "time": "07:26",
    "speaker": "Bibhuti Anand",
    "text": "Real time assistance work?"
  },
  {
    "time": "07:27",
    "speaker": "Bibhuti Anand",
    "text": "Is it able to understand the query?"
  },
  {
    "time": "07:29",
    "speaker": "Bibhuti Anand",
    "text": "Is it able to handle multilingual questions and is it able to generate the."
  },
  {
    "time": "07:33",
    "speaker": "Bibhuti Anand",
    "text": "Responses in a very short time."
  },
  {
    "time": "07:36",
    "speaker": "Bibhuti Anand",
    "text": "Frame, very low latency so that the prompt is useful to the agent?"
  },
  {
    "time": "07:42",
    "speaker": "Bibhuti Anand",
    "text": "That is the first thing we will show."
  },
  {
    "time": "07:44",
    "speaker": "Bibhuti Anand",
    "text": "And then we would show in the."
  },
  {
    "time": "07:46",
    "speaker": "Bibhuti Anand",
    "text": "Current setup for insurance, how does the."
  },
  {
    "time": "07:48",
    "speaker": "Bibhuti Anand",
    "text": "Post facto post meeting review of a call looks like?"
  },
  {
    "time": "07:52",
    "speaker": "Bibhuti Anand",
    "text": "We can always add more parameters, customize."
  },
  {
    "time": "07:54",
    "speaker": "Bibhuti Anand",
    "text": "It as per your particular use case."
  },
  {
    "time": "08:01",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so I'm going to create a."
  },
  {
    "time": "08:06",
    "speaker": "Bibhuti Anand",
    "text": "New lead here and I'm going to open the page."
  },
  {
    "time": "08:11",
    "speaker": "Bibhuti Anand",
    "text": "See as I said, this is for insurance."
  },
  {
    "time": "08:13",
    "speaker": "Bibhuti Anand",
    "text": "Right?"
  },
  {
    "time": "08:13",
    "speaker": "Bibhuti Anand",
    "text": "But the key thing here is as I start talking to the system as."
  },
  {
    "time": "08:18",
    "speaker": "Bibhuti Anand",
    "text": "So if you see this screen has."
  },
  {
    "time": "08:20",
    "speaker": "Bibhuti Anand",
    "text": "Data fields like name, city, age, family structure."
  },
  {
    "time": "08:24",
    "speaker": "Bibhuti Anand",
    "text": "So as I as the customer speaks, the system would be able to understand whatever I say and it would be able to extract relevant information from."
  },
  {
    "time": "08:34",
    "speaker": "Bibhuti Anand",
    "text": "The, from my utterances and then I'd."
  },
  {
    "time": "08:38",
    "speaker": "Bibhuti Anand",
    "text": "Ask it certain questions regarding this insurance."
  },
  {
    "time": "08:41",
    "speaker": "Bibhuti Anand",
    "text": "Policy and then you'd see that the system is able to answer questions based on that."
  },
  {
    "time": "08:47",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so I'm going to click on."
  },
  {
    "time": "08:48",
    "speaker": "Bibhuti Anand",
    "text": "The play button and start convert conversion."
  },
  {
    "time": "09:15",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so I finished my sentence at approximately 18th second and by the 23rd."
  },
  {
    "time": "09:21",
    "speaker": "Bibhuti Anand",
    "text": "Second the system had all this information."
  },
  {
    "time": "09:23",
    "speaker": "Bibhuti Anand",
    "text": "So it was able to understand my name, my age."
  },
  {
    "time": "09:27",
    "speaker": "Bibhuti Anand",
    "text": "I'm looking for coverage for myself one."
  },
  {
    "time": "09:29",
    "speaker": "Bibhuti Anand",
    "text": "Adult and cities Pune."
  },
  {
    "time": "09:31",
    "speaker": "Bibhuti Anand",
    "text": "And then it's suggesting to the salesperson."
  },
  {
    "time": "09:34",
    "speaker": "Bibhuti Anand",
    "text": "To the tele calling executive and suggesting that you should ask this follow up question."
  },
  {
    "time": "09:39",
    "speaker": "Bibhuti Anand",
    "text": "So this is how it's able to."
  },
  {
    "time": "09:40",
    "speaker": "Bibhuti Anand",
    "text": "Listen to the conversation, extract all relevant data points and act on that."
  },
  {
    "time": "09:45",
    "speaker": "Bibhuti Anand",
    "text": "Now it will, now I'll ask it a few questions regarding the insurance policies."
  },
  {
    "time": "09:49",
    "speaker": "Bibhuti Anand",
    "text": "Which on which this entire system has."
  },
  {
    "time": "09:52",
    "speaker": "Bibhuti Anand",
    "text": "Been trained and you would see how."
  },
  {
    "time": "09:54",
    "speaker": "Bibhuti Anand",
    "text": "The response gets generated which can then be used by the telecaller and the telecaller can then articulate it in his or her own words."
  },
  {
    "time": "10:19",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so I finished my query at 30th second and within two seconds it."
  },
  {
    "time": "10:26",
    "speaker": "Bibhuti Anand",
    "text": "Had this information on my screen."
  },
  {
    "time": "10:29",
    "speaker": "Bibhuti Anand",
    "text": "What discounts are available if I buy Reliance Health Gain?"
  },
  {
    "time": "10:31",
    "speaker": "Bibhuti Anand",
    "text": "It says that with Reliance Health Gain you can benefit from following discounts."
  },
  {
    "time": "10:35",
    "speaker": "Bibhuti Anand",
    "text": "10% for online, 7.5% for existing policies, 12% for having a three year policy."
  },
  {
    "time": "10:41",
    "speaker": "Bibhuti Anand",
    "text": "So now the sales."
  },
  {
    "time": "10:43",
    "speaker": "Bibhuti Anand",
    "text": "The telecollar doesn't need to answer these."
  },
  {
    "time": "10:46",
    "speaker": "Bibhuti Anand",
    "text": "Queries based on their memory."
  },
  {
    "time": "10:49",
    "speaker": "Bibhuti Anand",
    "text": "They don't need to go and search for information on different product brochures or different portal."
  },
  {
    "time": "10:54",
    "speaker": "Bibhuti Anand",
    "text": "Whatever question the customer asks, if the."
  },
  {
    "time": "10:57",
    "speaker": "Bibhuti Anand",
    "text": "Answer to that is present in the knowledge bank, the system will be able."
  },
  {
    "time": "11:00",
    "speaker": "Bibhuti Anand",
    "text": "To retrieve the information and present it on the screen in less than five seconds."
  },
  {
    "time": "11:05",
    "speaker": "Bibhuti Anand",
    "text": "So five seconds is the outer benchmark."
  },
  {
    "time": "11:09",
    "speaker": "Bibhuti Anand",
    "text": "But as you saw here, within two."
  },
  {
    "time": "11:11",
    "speaker": "Bibhuti Anand",
    "text": "Seconds it was able to generate the response."
  },
  {
    "time": "11:13",
    "speaker": "Bibhuti Anand",
    "text": "It ensures that the telecol always gives."
  },
  {
    "time": "11:16",
    "speaker": "Bibhuti Anand",
    "text": "The 100% accurate information."
  },
  {
    "time": "11:18",
    "speaker": "Bibhuti Anand",
    "text": "Whatever question."
  },
  {
    "time": "11:19",
    "speaker": "Bibhuti Anand",
    "text": "Customer asks very complicated questions as well."
  },
  {
    "time": "11:22",
    "speaker": "Bibhuti Anand",
    "text": "It would be able to handle if the answer is present in the knowledge bank."
  },
  {
    "time": "11:25",
    "speaker": "Bibhuti Anand",
    "text": "So then all we have to do is to create the knowledge bank, ensuring."
  },
  {
    "time": "11:30",
    "speaker": "Bibhuti Anand",
    "text": "That it has, you know, all the relevant information."
  },
  {
    "time": "11:33",
    "speaker": "Bibhuti Anand",
    "text": "So let's say you would have certain."
  },
  {
    "time": "11:35",
    "speaker": "Bibhuti Anand",
    "text": "Process guidelines for your telecollas."
  },
  {
    "time": "11:38",
    "speaker": "Bibhuti Anand",
    "text": "So whatever training material you have for."
  },
  {
    "time": "11:40",
    "speaker": "Bibhuti Anand",
    "text": "Daily callers, we can create a retrieval system based on that and then the."
  },
  {
    "time": "11:46",
    "speaker": "Bibhuti Anand",
    "text": "System will refer to that to create its responses in real time."
  },
  {
    "time": "11:50",
    "speaker": "Bibhuti Anand",
    "text": "I'd ask couple of more queries and then I'll take a pause, you know."
  },
  {
    "time": "11:55",
    "speaker": "Bibhuti Anand",
    "text": "If you have any questions."
  },
  {
    "time": "12:00",
    "speaker": "Bibhuti Anand",
    "text": "Policy waiting period."
  },
  {
    "time": "12:08",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so."
  },
  {
    "time": "12:17",
    "speaker": "Bibhuti Anand",
    "text": "It provides this information."
  },
  {
    "time": "12:20",
    "speaker": "Bibhuti Anand",
    "text": "That waiting period for this is 15 days."
  },
  {
    "time": "12:26",
    "speaker": "Bibhuti Anand",
    "text": "Let me check a few more queries."
  },
  {
    "time": "12:29",
    "speaker": "Bibhuti Anand",
    "text": "Okay."
  },
  {
    "time": "12:30",
    "speaker": "Bibhuti Anand",
    "text": "What are the."
  },
  {
    "time": "12:36",
    "speaker": "Bibhuti Anand",
    "text": "Policy cancel."
  },
  {
    "time": "12:45",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so it's a policy cancel."
  },
  {
    "time": "12:47",
    "speaker": "Bibhuti Anand",
    "text": "So if you see the response got generated within 2, 3 seconds and then."
  },
  {
    "time": "12:52",
    "speaker": "Bibhuti Anand",
    "text": "It says that you cancel the policy by giving written notice within 15 days, refund premium will be initiated according to policy conditions."
  },
  {
    "time": "13:00",
    "speaker": "Bibhuti Anand",
    "text": "Right."
  },
  {
    "time": "13:00",
    "speaker": "Bibhuti Anand",
    "text": "So this response is getting picked from this particular knowledge bank."
  },
  {
    "time": "13:05",
    "speaker": "Bibhuti Anand",
    "text": "Right."
  },
  {
    "time": "13:06",
    "speaker": "Bibhuti Anand",
    "text": "So yeah, that's how the system works."
  },
  {
    "time": "13:09",
    "speaker": "Bibhuti Anand",
    "text": "And it can integrate with your existing CRM, existing databases and it can pull up relevant information from there as well."
  },
  {
    "time": "13:18",
    "speaker": "Bibhuti Anand",
    "text": "Otherwise it can answer user queries based on the knowledge bank."
  },
  {
    "time": "13:23",
    "speaker": "Bibhuti Anand",
    "text": "Anything you'd want to ask at this point?"
  },
  {
    "time": "13:28",
    "speaker": "Bibhuti Anand",
    "text": "Yes."
  },
  {
    "time": "13:29",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "So instead of a voice, if the team enters via a text."
  },
  {
    "time": "13:36",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "So it will throw the same results?"
  },
  {
    "time": "13:38",
    "speaker": "Bibhuti Anand",
    "text": "Yeah, yeah, just the output difference."
  },
  {
    "time": "13:42",
    "speaker": "Bibhuti Anand",
    "text": "I mean yeah, it can work on."
  },
  {
    "time": "13:43",
    "speaker": "Bibhuti Anand",
    "text": "Chat as well but in telecom setup."
  },
  {
    "time": "13:47",
    "speaker": "Bibhuti Anand",
    "text": "It'S difficult for the telecollar side because they are listening to the conversation and they have to type in parallel which will take time."
  },
  {
    "time": "13:55",
    "speaker": "Bibhuti Anand",
    "text": "So."
  },
  {
    "time": "13:55",
    "speaker": "Bibhuti Anand",
    "text": "Yeah, okay."
  },
  {
    "time": "13:58",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "And."
  },
  {
    "time": "13:59",
    "speaker": "Bibhuti Anand",
    "text": "But technically they can ask inside as well."
  },
  {
    "time": "14:01",
    "speaker": "Bibhuti Anand",
    "text": "Yeah."
  },
  {
    "time": "14:01",
    "speaker": "Bibhuti Anand",
    "text": "Sorry."
  },
  {
    "time": "14:02",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "So your tech is entire built by you or you someone you have outsourced this?"
  },
  {
    "time": "14:09",
    "speaker": "Bibhuti Anand",
    "text": "No."
  },
  {
    "time": "14:10",
    "speaker": "Bibhuti Anand",
    "text": "So entire platform, every component has been built in house."
  },
  {
    "time": "14:15",
    "speaker": "Bibhuti Anand",
    "text": "No outsourcing, nothing."
  },
  {
    "time": "14:17",
    "speaker": "Bibhuti Anand",
    "text": "We have been working in this industry."
  },
  {
    "time": "14:18",
    "speaker": "Bibhuti Anand",
    "text": "Since 2017 when AI or generative AI was not even a buzzword."
  },
  {
    "time": "14:23",
    "speaker": "Bibhuti Anand",
    "text": "You know."
  },
  {
    "time": "14:23",
    "speaker": "Bibhuti Anand",
    "text": "So we go long back over the last seven, eight years we have developed the expertise in house and everything is built in house."
  },
  {
    "time": "14:30",
    "speaker": "Bibhuti Anand",
    "text": "And we are also not using any API."
  },
  {
    "time": "14:33",
    "speaker": "Bibhuti Anand",
    "text": "So it's not a wrapper on Gemini."
  },
  {
    "time": "14:35",
    "speaker": "Bibhuti Anand",
    "text": "Or Chad GPT or something."
  },
  {
    "time": "14:36",
    "speaker": "Bibhuti Anand",
    "text": "Every component that you see, it's open."
  },
  {
    "time": "14:39",
    "speaker": "Bibhuti Anand",
    "text": "Source model deployed on our private GPUs."
  },
  {
    "time": "14:42",
    "speaker": "Bibhuti Anand",
    "text": "So the model which converts a speech to text or the LLM or even."
  },
  {
    "time": "14:47",
    "speaker": "Bibhuti Anand",
    "text": "The embedding models, everything is open source."
  },
  {
    "time": "14:50",
    "speaker": "Bibhuti Anand",
    "text": "Fine tuned for our purpose which is BFSI India spec and deployed on our private GPUs."
  },
  {
    "time": "14:57",
    "speaker": "Bibhuti Anand",
    "text": "So no outsourcing, no third party APIs."
  },
  {
    "time": "15:00",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Okay, got it."
  },
  {
    "time": "15:06",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "And so you, how often do you train the model?"
  },
  {
    "time": "15:10",
    "speaker": "Bibhuti Anand",
    "text": "So okay, what we have seen is."
  },
  {
    "time": "15:15",
    "speaker": "Bibhuti Anand",
    "text": "When we deploy it for the first time for any client, when we go."
  },
  {
    "time": "15:18",
    "speaker": "Bibhuti Anand",
    "text": "To production, initial few weeks, the training frequency needs to be higher because the."
  },
  {
    "time": "15:24",
    "speaker": "Bibhuti Anand",
    "text": "System would encounter certain kind of queries."
  },
  {
    "time": "15:26",
    "speaker": "Bibhuti Anand",
    "text": "Where it didn't work."
  },
  {
    "time": "15:28",
    "speaker": "Bibhuti Anand",
    "text": "So for example when we deployed this system for Aditya Birla Capital, so initial couple of months the system's accuracy and accuracy I'm describing in terms of transcription."
  },
  {
    "time": "15:38",
    "speaker": "Bibhuti Anand",
    "text": "Accuracy was, let's say 80%."
  },
  {
    "time": "15:41",
    "speaker": "Bibhuti Anand",
    "text": "It was not able to understand certain finance specific keywords indian accent and Indian languages."
  },
  {
    "time": "15:48",
    "speaker": "Bibhuti Anand",
    "text": "So we had to fine tune The ASR model for those specific words."
  },
  {
    "time": "15:53",
    "speaker": "Bibhuti Anand",
    "text": "So what we did was we created synthetic data and then fine tuned the model."
  },
  {
    "time": "15:56",
    "speaker": "Bibhuti Anand",
    "text": "We had to keep iterating that process."
  },
  {
    "time": "15:58",
    "speaker": "Bibhuti Anand",
    "text": "Process for some time."
  },
  {
    "time": "16:00",
    "speaker": "Bibhuti Anand",
    "text": "And now today it's at a stage where the training, it's like very rarely."
  },
  {
    "time": "16:06",
    "speaker": "Bibhuti Anand",
    "text": "In a month we would encounter any question which was not answered properly and where any sort of fine tuning is required."
  },
  {
    "time": "16:12",
    "speaker": "Bibhuti Anand",
    "text": "So our model training frequency reduced from."
  },
  {
    "time": "16:17",
    "speaker": "Bibhuti Anand",
    "text": "Couple every two or three days initially to right now, maybe once in a month."
  },
  {
    "time": "16:25",
    "speaker": "Bibhuti Anand",
    "text": "So that's on the training bed for."
  },
  {
    "time": "16:27",
    "speaker": "Bibhuti Anand",
    "text": "The ASR model as well as fine tuning generally is not required for LLMs."
  },
  {
    "time": "16:33",
    "speaker": "Bibhuti Anand",
    "text": "Based on prompt and context engineering, we."
  },
  {
    "time": "16:35",
    "speaker": "Bibhuti Anand",
    "text": "Are able to use open source models such as Phi and Llama to work."
  },
  {
    "time": "16:41",
    "speaker": "Bibhuti Anand",
    "text": "For our use case."
  },
  {
    "time": "16:43",
    "speaker": "Bibhuti Anand",
    "text": "But yeah, model fine tuning can also be done if we want to have the output in a particular way."
  },
  {
    "time": "16:49",
    "speaker": "Bibhuti Anand",
    "text": "But the training frequency reduces drastically, maybe."
  },
  {
    "time": "16:54",
    "speaker": "Bibhuti Anand",
    "text": "A bit high initial months and."
  },
  {
    "time": "16:56",
    "speaker": "Bibhuti Anand",
    "text": "Then gradually it goes into autopilot mode."
  },
  {
    "time": "17:08",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so let me show you how the post building analysis looks like."
  },
  {
    "time": "17:21",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so this dashboard that you see on the screen."
  },
  {
    "time": "17:30",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so this dashboard that you see."
  },
  {
    "time": "17:32",
    "speaker": "Bibhuti Anand",
    "text": "On the screen, it's for another client."
  },
  {
    "time": "17:35",
    "speaker": "Bibhuti Anand",
    "text": "But yeah, I mean we are comfortable showing it."
  },
  {
    "time": "17:37",
    "speaker": "Bibhuti Anand",
    "text": "So this was, this is again a customer which is using our product for insurance use case."
  },
  {
    "time": "17:43",
    "speaker": "Bibhuti Anand",
    "text": "They are an insurance broker."
  },
  {
    "time": "17:45",
    "speaker": "Bibhuti Anand",
    "text": "So here you see the audio of."
  },
  {
    "time": "17:47",
    "speaker": "Bibhuti Anand",
    "text": "The call and the transcript of the call."
  },
  {
    "time": "17:50",
    "speaker": "Bibhuti Anand",
    "text": "Client profile snapshot has certain data points which have been captured from the call."
  },
  {
    "time": "17:54",
    "speaker": "Bibhuti Anand",
    "text": "And then what it does is it reviews the performance of the agent on a set of parameters and these parameters."
  },
  {
    "time": "18:02",
    "speaker": "Bibhuti Anand",
    "text": "Are configurable, we can add new parameters."
  },
  {
    "time": "18:04",
    "speaker": "Bibhuti Anand",
    "text": "And we can customize the logic behind calculating these parameters."
  },
  {
    "time": "18:09",
    "speaker": "Bibhuti Anand",
    "text": "So product knowledge, rapport building, need analysis, objection."
  },
  {
    "time": "18:13",
    "speaker": "Bibhuti Anand",
    "text": "Handling, cross selling, process adherence."
  },
  {
    "time": "18:15",
    "speaker": "Bibhuti Anand",
    "text": "These are some of the criteria on which they wanted to evaluate their daily callers."
  },
  {
    "time": "18:20",
    "speaker": "Bibhuti Anand",
    "text": "So what we did was we understood their existing QA process and accordingly we."
  },
  {
    "time": "18:25",
    "speaker": "Bibhuti Anand",
    "text": "Aligned our setup just that they were."
  },
  {
    "time": "18:27",
    "speaker": "Bibhuti Anand",
    "text": "Doing a few calls in a month."
  },
  {
    "time": "18:30",
    "speaker": "Bibhuti Anand",
    "text": "Audit of a few calls and now they are able to do it 100% for everyone."
  },
  {
    "time": "18:34",
    "speaker": "Bibhuti Anand",
    "text": "And apart from generating performance review scores on these different parameters, it also."
  },
  {
    "time": "18:41",
    "speaker": "Bibhuti Anand",
    "text": "Gives what are the strengths of that."
  },
  {
    "time": "18:43",
    "speaker": "Bibhuti Anand",
    "text": "Particular agent, what are the areas of improvement?"
  },
  {
    "time": "18:46",
    "speaker": "Bibhuti Anand",
    "text": "And then detailed breakdown on each of the parameters."
  },
  {
    "time": "18:49",
    "speaker": "Bibhuti Anand",
    "text": "For example, on product knowledge, it analyzed this particular call and gave a score of 5 out of 10 to this agent."
  },
  {
    "time": "18:56",
    "speaker": "Bibhuti Anand",
    "text": "And it's saying that the agent has."
  },
  {
    "time": "18:57",
    "speaker": "Bibhuti Anand",
    "text": "A basic understanding of the product but was inconsistent in explaining the coverage details."
  },
  {
    "time": "19:02",
    "speaker": "Bibhuti Anand",
    "text": "So it also provides information on what."
  },
  {
    "time": "19:05",
    "speaker": "Bibhuti Anand",
    "text": "Sort of gap exists and what sort."
  },
  {
    "time": "19:07",
    "speaker": "Bibhuti Anand",
    "text": "Of training Intervention is required and then it's also giving an AI tape that you know what is required to be done by the agent to improve his performance."
  },
  {
    "time": "19:18",
    "speaker": "Bibhuti Anand",
    "text": "Right."
  },
  {
    "time": "19:18",
    "speaker": "Bibhuti Anand",
    "text": "So and similarly for every parameter repo building needs analysis."
  },
  {
    "time": "19:22",
    "speaker": "Bibhuti Anand",
    "text": "Objection Handling cross selling process adherence now the way this entire system works is."
  },
  {
    "time": "19:29",
    "speaker": "Bibhuti Anand",
    "text": "We have a sales guidelines document."
  },
  {
    "time": "19:31",
    "speaker": "Bibhuti Anand",
    "text": "So the client provided us a sales guideline document."
  },
  {
    "time": "19:34",
    "speaker": "Bibhuti Anand",
    "text": "What the system does is it evaluates the agent's performance so it goes through the transcript and reviews it, keeping in."
  },
  {
    "time": "19:43",
    "speaker": "Bibhuti Anand",
    "text": "Mind the guidelines which were provided by."
  },
  {
    "time": "19:45",
    "speaker": "Bibhuti Anand",
    "text": "The client so that the review is being done as per their expectation."
  },
  {
    "time": "19:51",
    "speaker": "Bibhuti Anand",
    "text": "What I want to explain here is."
  },
  {
    "time": "19:54",
    "speaker": "Bibhuti Anand",
    "text": "Customizations are not required per se."
  },
  {
    "time": "19:56",
    "speaker": "Bibhuti Anand",
    "text": "Only thing that would be required is if you have any sort of guidelines."
  },
  {
    "time": "20:00",
    "speaker": "Bibhuti Anand",
    "text": "Which are being used by reviewers who would be doing the QA review of."
  },
  {
    "time": "20:05",
    "speaker": "Bibhuti Anand",
    "text": "Tele calls right now, if they have."
  },
  {
    "time": "20:07",
    "speaker": "Bibhuti Anand",
    "text": "Any such document, then you just need to provide us that document."
  },
  {
    "time": "20:11",
    "speaker": "Bibhuti Anand",
    "text": "And then rest of the system, rest."
  },
  {
    "time": "20:12",
    "speaker": "Bibhuti Anand",
    "text": "Of the pipelines is automatic."
  },
  {
    "time": "20:14",
    "speaker": "Bibhuti Anand",
    "text": "I mean that's already in place."
  },
  {
    "time": "20:16",
    "speaker": "Bibhuti Anand",
    "text": "System will consume the guidelines and then."
  },
  {
    "time": "20:19",
    "speaker": "Bibhuti Anand",
    "text": "Within the boundaries of or within the."
  },
  {
    "time": "20:23",
    "speaker": "Bibhuti Anand",
    "text": "Constraints or guardrails established by the guideline document, it will evaluate the agent's performance and then it will generate scores."
  },
  {
    "time": "20:31",
    "speaker": "Bibhuti Anand",
    "text": "So this is what it does for one particular call and then we have this setup where you have."
  },
  {
    "time": "20:37",
    "speaker": "Bibhuti Anand",
    "text": "So for example every sales manager or."
  },
  {
    "time": "20:40",
    "speaker": "Bibhuti Anand",
    "text": "Every lead will have or any location will have number of telecallers."
  },
  {
    "time": "20:45",
    "speaker": "Bibhuti Anand",
    "text": "So this, the earlier UI that I."
  },
  {
    "time": "20:47",
    "speaker": "Bibhuti Anand",
    "text": "Showed you, this was for one particular meeting."
  },
  {
    "time": "20:50",
    "speaker": "Bibhuti Anand",
    "text": "This view that you see on your screen right now, this is at an aggregate level."
  },
  {
    "time": "20:56",
    "speaker": "Bibhuti Anand",
    "text": "All the calls that particular agent did."
  },
  {
    "time": "21:03",
    "speaker": "Bibhuti Anand",
    "text": "And the data that you see over here is dummy data."
  },
  {
    "time": "21:07",
    "speaker": "Bibhuti Anand",
    "text": "But yeah, once we plug to database for a particular client, these graphs get auto generated and we can add any number of graphs."
  },
  {
    "time": "21:16",
    "speaker": "Bibhuti Anand",
    "text": "If there is any additional data point that you would want to monitor, we can add that as well."
  },
  {
    "time": "21:21",
    "speaker": "Bibhuti Anand",
    "text": "This particular UI has aggregate view on."
  },
  {
    "time": "21:25",
    "speaker": "Bibhuti Anand",
    "text": "That particular agent, all the calls done."
  },
  {
    "time": "21:27",
    "speaker": "Bibhuti Anand",
    "text": "By that particular agent and you have all the things like follow up, efficiency."
  },
  {
    "time": "21:34",
    "speaker": "Bibhuti Anand",
    "text": "Conversion rate, revenue contribution, anything that you want to monitor."
  },
  {
    "time": "21:39",
    "speaker": "Bibhuti Anand",
    "text": "This is for a particular agent."
  },
  {
    "time": "21:41",
    "speaker": "Bibhuti Anand",
    "text": "And then there is a view for."
  },
  {
    "time": "21:43",
    "speaker": "Bibhuti Anand",
    "text": "All the agents under a particular manager at an aggregate level here."
  },
  {
    "time": "21:49",
    "speaker": "Bibhuti Anand",
    "text": "And you can define the parameters."
  },
  {
    "time": "21:51",
    "speaker": "Bibhuti Anand",
    "text": "For example this particular client they are using for their daily sales use case where the agents are calling for sales."
  },
  {
    "time": "21:59",
    "speaker": "Bibhuti Anand",
    "text": "Accordingly the parameters or the charts have been designed."
  },
  {
    "time": "22:03",
    "speaker": "Bibhuti Anand",
    "text": "If there is any other parameter that."
  },
  {
    "time": "22:05",
    "speaker": "Bibhuti Anand",
    "text": "You want to track."
  },
  {
    "time": "22:06",
    "speaker": "Bibhuti Anand",
    "text": "For example, let's say instead of conversion rate, if you want to track average."
  },
  {
    "time": "22:10",
    "speaker": "Bibhuti Anand",
    "text": "Handling time, then all it takes us."
  },
  {
    "time": "22:13",
    "speaker": "Bibhuti Anand",
    "text": "Is configure it from the backend and it will be able to provide that information, the entire UI and everything is again customizable."
  },
  {
    "time": "22:24",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so I'll take a pause here if you have any queries on this review or dashboard."
  },
  {
    "time": "22:43",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "After the call."
  },
  {
    "time": "22:44",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Right."
  },
  {
    "time": "23:04",
    "speaker": "Bibhuti Anand",
    "text": "It's for wealth management, but then the."
  },
  {
    "time": "23:07",
    "speaker": "Bibhuti Anand",
    "text": "Particular bot is capable of talking about insurance as well."
  },
  {
    "time": "23:11",
    "speaker": "Bibhuti Anand",
    "text": "So both wealth and insurance are covered in that particular board."
  },
  {
    "time": "23:15",
    "speaker": "Bibhuti Anand",
    "text": "It."
  },
  {
    "time": "23:38",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "So and I give you the conversation history, whatever it, whatever conversation we had with the client."
  },
  {
    "time": "23:45",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "So do you have a demo within, what suggestions do you, does your solution give to them?"
  },
  {
    "time": "23:52",
    "speaker": "Bibhuti Anand",
    "text": "Okay, yes, we can extract insights from."
  },
  {
    "time": "23:56",
    "speaker": "Bibhuti Anand",
    "text": "That, but we would need some more information like what is the domain for."
  },
  {
    "time": "24:01",
    "speaker": "Bibhuti Anand",
    "text": "Which those calls would be."
  },
  {
    "time": "24:02",
    "speaker": "Bibhuti Anand",
    "text": "I mean you need to accordingly maybe make some changes in the prompt that goes to the AI model."
  },
  {
    "time": "24:09",
    "speaker": "Bibhuti Anand",
    "text": "But yes, we can do it."
  },
  {
    "time": "24:10",
    "speaker": "Bibhuti Anand",
    "text": "If you provide us call recordings, we."
  },
  {
    "time": "24:13",
    "speaker": "Bibhuti Anand",
    "text": "Can generate transcripts and analysis based on those recordings and we can share those insights."
  },
  {
    "time": "24:18",
    "speaker": "Bibhuti Anand",
    "text": "So we can pull up if you have a set of parameters which you."
  },
  {
    "time": "24:22",
    "speaker": "Bibhuti Anand",
    "text": "Want to know, like if you want to check what was the product knowledge of the agent or did they adhere to the process."
  },
  {
    "time": "24:30",
    "speaker": "Bibhuti Anand",
    "text": "Right."
  },
  {
    "time": "24:31",
    "speaker": "Bibhuti Anand",
    "text": "So let's take this example."
  },
  {
    "time": "24:32",
    "speaker": "Bibhuti Anand",
    "text": "If you want to know out of those calls, if you want to know whether the telecollars are adhering to the."
  },
  {
    "time": "24:38",
    "speaker": "Bibhuti Anand",
    "text": "Recommended process or not, we can find it out."
  },
  {
    "time": "24:42",
    "speaker": "Bibhuti Anand",
    "text": "But you would also need to tell."
  },
  {
    "time": "24:43",
    "speaker": "Bibhuti Anand",
    "text": "Us what is the process, what is the recommended guideline?"
  },
  {
    "time": "24:47",
    "speaker": "Bibhuti Anand",
    "text": "Because the AI model would then compare."
  },
  {
    "time": "24:50",
    "speaker": "Bibhuti Anand",
    "text": "Agents conversation in that particular call with that guideline document and then it would."
  },
  {
    "time": "24:55",
    "speaker": "Bibhuti Anand",
    "text": "Be able to calculate the process adherence score."
  },
  {
    "time": "24:58",
    "speaker": "Bibhuti Anand",
    "text": "Similarly, we can find out cross selling."
  },
  {
    "time": "25:00",
    "speaker": "Bibhuti Anand",
    "text": "All you need to tell us is which are the products which are supposed to be cross sold."
  },
  {
    "time": "25:05",
    "speaker": "Bibhuti Anand",
    "text": "And then AI would be able to identify whether the telecollars are making an attempt to cross sell or not."
  },
  {
    "time": "25:12",
    "speaker": "Bibhuti Anand",
    "text": "Similarly, let's say objection handling."
  },
  {
    "time": "25:14",
    "speaker": "Bibhuti Anand",
    "text": "Objection, handling means how well the telecollar could handle the questions that the customer had."
  },
  {
    "time": "25:20",
    "speaker": "Bibhuti Anand",
    "text": "Right."
  },
  {
    "time": "25:21",
    "speaker": "Bibhuti Anand",
    "text": "So if you provide us the call."
  },
  {
    "time": "25:23",
    "speaker": "Bibhuti Anand",
    "text": "Recordings, we can generate the transcripts and we can find out what were the questions that the customers asked."
  },
  {
    "time": "25:29",
    "speaker": "Bibhuti Anand",
    "text": "But if you have to evaluate the responses to those queries, of course AI can do a generic review."
  },
  {
    "time": "25:35",
    "speaker": "Bibhuti Anand",
    "text": "But then if you provide us a knowledge bank which has ideal or recommended responses or answers to those questions as."
  },
  {
    "time": "25:43",
    "speaker": "Bibhuti Anand",
    "text": "Well, then the AI model would be."
  },
  {
    "time": "25:44",
    "speaker": "Bibhuti Anand",
    "text": "Able to compare agents response with the."
  },
  {
    "time": "25:47",
    "speaker": "Bibhuti Anand",
    "text": "Ideal response and then it would be able to identify the gap or give a score."
  },
  {
    "time": "25:53",
    "speaker": "Bibhuti Anand",
    "text": "So I hope I could explain, I."
  },
  {
    "time": "25:55",
    "speaker": "Bibhuti Anand",
    "text": "Mean we can do all this in."
  },
  {
    "time": "25:56",
    "speaker": "Bibhuti Anand",
    "text": "Generating insights or transcripts."
  },
  {
    "time": "25:58",
    "speaker": "Bibhuti Anand",
    "text": "We just need something to benchmark against."
  },
  {
    "time": "26:01",
    "speaker": "Bibhuti Anand",
    "text": "Right."
  },
  {
    "time": "26:01",
    "speaker": "Bibhuti Anand",
    "text": "Because only then it would make sense to evaluate the agent's performance."
  },
  {
    "time": "26:17",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "So your solution gives insights on real time basis."
  },
  {
    "time": "26:21",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Or it's a post call analysis."
  },
  {
    "time": "26:23",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Or it's a pre call this thing."
  },
  {
    "time": "26:26",
    "speaker": "Bibhuti Anand",
    "text": "Okay."
  },
  {
    "time": "26:26",
    "speaker": "Bibhuti Anand",
    "text": "So for Aditya Birla we have a chatbot as well as a voice bot which interacts with their customers directly."
  },
  {
    "time": "26:32",
    "speaker": "Bibhuti Anand",
    "text": "And we also have a tele calling."
  },
  {
    "time": "26:35",
    "speaker": "Bibhuti Anand",
    "text": "Setup or real time assistance for their relationship managers for in person meeting."
  },
  {
    "time": "26:40",
    "speaker": "Bibhuti Anand",
    "text": "And then they have a virtual relationship manager team."
  },
  {
    "time": "26:43",
    "speaker": "Bibhuti Anand",
    "text": "A team of 15 people who calls customers over there."
  },
  {
    "time": "26:46",
    "speaker": "Bibhuti Anand",
    "text": "Currently we are doing this post facto analysis for them."
  },
  {
    "time": "26:55",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Okay, post factor analysis."
  },
  {
    "time": "26:58",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "I got it."
  },
  {
    "time": "26:59",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "But is it real time basis?"
  },
  {
    "time": "27:03",
    "speaker": "Bibhuti Anand",
    "text": "I mean as soon as the call."
  },
  {
    "time": "27:04",
    "speaker": "Bibhuti Anand",
    "text": "No, we are not giving them real time prompts."
  },
  {
    "time": "27:07",
    "speaker": "Bibhuti Anand",
    "text": "But as soon as the call gets over, immediately after the call the insights are available."
  },
  {
    "time": "27:14",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "That solution we have."
  },
  {
    "time": "27:15",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "But on real time."
  },
  {
    "time": "27:17",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "You have not deployed the solution anywhere."
  },
  {
    "time": "27:19",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Real time basis or giving insights on the conversation history that has happened."
  },
  {
    "time": "27:27",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so that we have done for."
  },
  {
    "time": "27:29",
    "speaker": "Bibhuti Anand",
    "text": "In person use cases."
  },
  {
    "time": "27:30",
    "speaker": "Bibhuti Anand",
    "text": "Real time assistance for in person."
  },
  {
    "time": "27:32",
    "speaker": "Bibhuti Anand",
    "text": "So this UI that you."
  },
  {
    "time": "27:34",
    "speaker": "Bibhuti Anand",
    "text": "So right now it's being used at."
  },
  {
    "time": "27:36",
    "speaker": "Bibhuti Anand",
    "text": "Indus and Insurance where real time responses are generated."
  },
  {
    "time": "27:41",
    "speaker": "Bibhuti Anand",
    "text": "But it's for in person meeting."
  },
  {
    "time": "27:43",
    "speaker": "Bibhuti Anand",
    "text": "So for tele calling setup, real time assistance we haven't deployed anywhere."
  },
  {
    "time": "27:48",
    "speaker": "Bibhuti Anand",
    "text": "Tele calling setup, post facto analysis."
  },
  {
    "time": "27:50",
    "speaker": "Bibhuti Anand",
    "text": "Yes, we have deployed voicebot chatbot, we have deployed tele calling real time."
  },
  {
    "time": "27:56",
    "speaker": "Bibhuti Anand",
    "text": "It's not live but in person."
  },
  {
    "time": "27:58",
    "speaker": "Bibhuti Anand",
    "text": "Real time assistance."
  },
  {
    "time": "27:59",
    "speaker": "Bibhuti Anand",
    "text": "It's live."
  },
  {
    "time": "28:01",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "In person."
  },
  {
    "time": "28:02",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "How does that work?"
  },
  {
    "time": "28:03",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "The RM is meeting client physically and so via chatbot."
  },
  {
    "time": "28:08",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Do you provide insights?"
  },
  {
    "time": "28:09",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "How is it?"
  },
  {
    "time": "28:10",
    "speaker": "Bibhuti Anand",
    "text": "No, no."
  },
  {
    "time": "28:11",
    "speaker": "Bibhuti Anand",
    "text": "So the screen that you see over here."
  },
  {
    "time": "28:13",
    "speaker": "Bibhuti Anand",
    "text": "So it's like they go to a."
  },
  {
    "time": "28:15",
    "speaker": "Bibhuti Anand",
    "text": "Meeting, first thing they do is they."
  },
  {
    "time": "28:17",
    "speaker": "Bibhuti Anand",
    "text": "Explain to the client that we are going to use AI to make sure that you get the right advice."
  },
  {
    "time": "28:20",
    "speaker": "Bibhuti Anand",
    "text": "And then they click on this play."
  },
  {
    "time": "28:22",
    "speaker": "Bibhuti Anand",
    "text": "Button, system starts listening to the live conversation it captures."
  },
  {
    "time": "28:27",
    "speaker": "Bibhuti Anand",
    "text": "In case of insurance, the first step."
  },
  {
    "time": "28:29",
    "speaker": "Bibhuti Anand",
    "text": "Would be that you have to ask."
  },
  {
    "time": "28:30",
    "speaker": "Bibhuti Anand",
    "text": "The customer all these questions to understand their requirement and build their profile."
  },
  {
    "time": "28:35",
    "speaker": "Bibhuti Anand",
    "text": "The agent clicks on this play button."
  },
  {
    "time": "28:38",
    "speaker": "Bibhuti Anand",
    "text": "So that system starts listening and then they get into a conversation with the customer."
  },
  {
    "time": "28:42",
    "speaker": "Bibhuti Anand",
    "text": "As the customer explains their requirement, AI listens and then captures all these data points."
  },
  {
    "time": "28:48",
    "speaker": "Bibhuti Anand",
    "text": "So let me show you from a."
  },
  {
    "time": "28:50",
    "speaker": "Bibhuti Anand",
    "text": "Previous link it would be easier to explain."
  },
  {
    "time": "28:53",
    "speaker": "Bibhuti Anand",
    "text": "So for example in this particular case the customer provided all this information, name is Sonam."
  },
  {
    "time": "28:59",
    "speaker": "Bibhuti Anand",
    "text": "Their."
  },
  {
    "time": "28:59",
    "speaker": "Bibhuti Anand",
    "text": "Their requirements and all."
  },
  {
    "time": "29:00",
    "speaker": "Bibhuti Anand",
    "text": "So system captures and."
  },
  {
    "time": "29:03",
    "speaker": "Bibhuti Anand",
    "text": "Right."
  },
  {
    "time": "29:04",
    "speaker": "Bibhuti Anand",
    "text": "You can change the language from over here."
  },
  {
    "time": "29:07",
    "speaker": "Bibhuti Anand",
    "text": "Right."
  },
  {
    "time": "29:07",
    "speaker": "Bibhuti Anand",
    "text": "So system listens to the conversation, captures all the data Points and then automatically generates recommendation."
  },
  {
    "time": "29:14",
    "speaker": "Bibhuti Anand",
    "text": "What is the plan to be recommended?"
  },
  {
    "time": "29:16",
    "speaker": "Bibhuti Anand",
    "text": "What should be the sum assured why this particular plan is being recommended."
  },
  {
    "time": "29:21",
    "speaker": "Bibhuti Anand",
    "text": "And then the agent explains all this."
  },
  {
    "time": "29:23",
    "speaker": "Bibhuti Anand",
    "text": "Thing to the customer."
  },
  {
    "time": "29:25",
    "speaker": "Bibhuti Anand",
    "text": "And if the customer is asking any."
  },
  {
    "time": "29:27",
    "speaker": "Bibhuti Anand",
    "text": "Question, then again AI is listening and in real time the response to that question gets generated here."
  },
  {
    "time": "29:38",
    "speaker": "Bibhuti Anand",
    "text": "Yes, this is for in person."
  },
  {
    "time": "29:40",
    "speaker": "Bibhuti Anand",
    "text": "In person."
  },
  {
    "time": "29:40",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Can this be done for teleconding setup as well?"
  },
  {
    "time": "29:44",
    "speaker": "Bibhuti Anand",
    "text": "Yes."
  },
  {
    "time": "29:45",
    "speaker": "Bibhuti Anand",
    "text": "And tele calling is actually easier because in person meeting AI has to first identify whether it's the customer speaking or whether it's the agent speaking."
  },
  {
    "time": "29:56",
    "speaker": "Bibhuti Anand",
    "text": "You know, and that's a complicated thing."
  },
  {
    "time": "29:58",
    "speaker": "Bibhuti Anand",
    "text": "In tele calling setup you have clearly."
  },
  {
    "time": "30:01",
    "speaker": "Bibhuti Anand",
    "text": "Demarketed channels because you'll be able to identify that okay, this particular voice is customer's voice as it's coming on a different channel."
  },
  {
    "time": "30:09",
    "speaker": "Bibhuti Anand",
    "text": "And then you just have to act."
  },
  {
    "time": "30:11",
    "speaker": "Bibhuti Anand",
    "text": "On the voice of the channel."
  },
  {
    "time": "30:12",
    "speaker": "Bibhuti Anand",
    "text": "So speaker diarization is inbuilt in tele."
  },
  {
    "time": "30:15",
    "speaker": "Bibhuti Anand",
    "text": "Calling and hence it's easier."
  },
  {
    "time": "30:17",
    "speaker": "Bibhuti Anand",
    "text": "Works better for tele calling in person."
  },
  {
    "time": "30:20",
    "speaker": "Bibhuti Anand",
    "text": "Because the system has to spend a lot of effort in identifying who is the customer and who is the agent."
  },
  {
    "time": "30:25",
    "speaker": "Bibhuti Anand",
    "text": "So it's actually a lot more complicated."
  },
  {
    "time": "30:27",
    "speaker": "Bibhuti Anand",
    "text": "It."
  },
  {
    "time": "30:28",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so it works beautifully for tele calling."
  },
  {
    "time": "30:32",
    "speaker": "Bibhuti Anand",
    "text": "We got interested in person because you know, were very focused on sales as a use case and sales is mostly being done by in person."
  },
  {
    "time": "30:43",
    "speaker": "Bibhuti Anand",
    "text": "Meetings indian context."
  },
  {
    "time": "30:46",
    "speaker": "Bibhuti Anand",
    "text": "So we wanted to build it for the in person use case but it."
  },
  {
    "time": "30:50",
    "speaker": "Bibhuti Anand",
    "text": "Works for telecalling as well."
  },
  {
    "time": "30:56",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Can you show a demo of your voiceboard?"
  },
  {
    "time": "31:00",
    "speaker": "Bibhuti Anand",
    "text": "Yes, I have a live version ready but it's not for."
  },
  {
    "time": "31:06",
    "speaker": "Bibhuti Anand",
    "text": "It's for a logistics client."
  },
  {
    "time": "31:07",
    "speaker": "Bibhuti Anand",
    "text": "So what I'll do is I'll show you a."
  },
  {
    "time": "31:12",
    "speaker": "Bibhuti Anand",
    "text": "Just give me a second, I'm going to play that."
  },
  {
    "time": "31:16",
    "speaker": "Bibhuti Anand",
    "text": "I have to include sound while sharing."
  },
  {
    "time": "31:24",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so I'm going to play this demo."
  },
  {
    "time": "31:29",
    "speaker": "Bibhuti Anand",
    "text": "I mean there is this UI as well, but that doesn't matter."
  },
  {
    "time": "31:33",
    "speaker": "Bibhuti Anand",
    "text": "So over here you would see and."
  },
  {
    "time": "31:35",
    "speaker": "Bibhuti Anand",
    "text": "This, this is the kind of expectation."
  },
  {
    "time": "31:36",
    "speaker": "Bibhuti Anand",
    "text": "You can have from our voice board."
  },
  {
    "time": "31:39",
    "speaker": "Bibhuti Anand",
    "text": "As I said, you know, today technology."
  },
  {
    "time": "31:41",
    "speaker": "Bibhuti Anand",
    "text": "Is not at a point where it will be completely index distinguishable from a human voice."
  },
  {
    "time": "31:47",
    "speaker": "Bibhuti Anand",
    "text": "So people would by and large be able to identify that they are talking to a bot and not to a human."
  },
  {
    "time": "31:54",
    "speaker": "Bibhuti Anand",
    "text": "And this bot works beautifully for having."
  },
  {
    "time": "31:57",
    "speaker": "Bibhuti Anand",
    "text": "First level of conversation with the customer."
  },
  {
    "time": "31:59",
    "speaker": "Bibhuti Anand",
    "text": "Whether you are qualifying a lead or you want to just send reminders or."
  },
  {
    "time": "32:03",
    "speaker": "Bibhuti Anand",
    "text": "Capture certain data points, it does a good job over that."
  },
  {
    "time": "32:07",
    "speaker": "Bibhuti Anand",
    "text": "But of course it can't have a."
  },
  {
    "time": "32:09",
    "speaker": "Bibhuti Anand",
    "text": "Human like in depth conversation."
  },
  {
    "time": "32:12",
    "speaker": "Bibhuti Anand",
    "text": "So from our point of view, ideal combination would be a bot which does."
  },
  {
    "time": "32:17",
    "speaker": "Bibhuti Anand",
    "text": "Initial conversation first level of conversation with the customer to understand the requirement or if it's a support call then handle basic queries."
  },
  {
    "time": "32:26",
    "speaker": "Bibhuti Anand",
    "text": "But if it's a agitated customer then."
  },
  {
    "time": "32:28",
    "speaker": "Bibhuti Anand",
    "text": "Probably it makes sense to transfer it."
  },
  {
    "time": "32:30",
    "speaker": "Bibhuti Anand",
    "text": "To a human agent."
  },
  {
    "time": "32:31",
    "speaker": "Bibhuti Anand",
    "text": "So a combination of voice bot plus a human agent makes more sense rather."
  },
  {
    "time": "32:35",
    "speaker": "Bibhuti Anand",
    "text": "Than replacing human agents completely with the voicebot."
  },
  {
    "time": "32:39",
    "speaker": "Bibhuti Anand",
    "text": "But yeah, I mean let's play this."
  },
  {
    "time": "32:42",
    "speaker": "Bibhuti Anand",
    "text": "Audio and this is the kind of quality that you can expect."
  },
  {
    "time": "32:47",
    "speaker": "Bibhuti Anand",
    "text": "Welcome to IIFL Securities Customer service To assist you better, please provide your account ID."
  },
  {
    "time": "32:55",
    "speaker": "Bibhuti Anand",
    "text": "Account ID have 4 5, 6, 7 8."
  },
  {
    "time": "33:36",
    "speaker": "Bibhuti Anand",
    "text": "Equity in trading futures option shorting may position."
  },
  {
    "time": "33:45",
    "speaker": "Bibhuti Anand",
    "text": "Calculator."
  },
  {
    "time": "34:04",
    "speaker": "Bibhuti Anand",
    "text": "Thank you."
  },
  {
    "time": "34:16",
    "speaker": "Bibhuti Anand",
    "text": "Okay, so in this particular demo, only."
  },
  {
    "time": "34:19",
    "speaker": "Bibhuti Anand",
    "text": "Thing I want to highlight is the text to speech bit is it's not our model."
  },
  {
    "time": "34:25",
    "speaker": "Bibhuti Anand",
    "text": "We are using Servam AI's model for this demo server AI was used."
  },
  {
    "time": "34:30",
    "speaker": "Bibhuti Anand",
    "text": "We can integrate with any other text to speech provider as well."
  },
  {
    "time": "34:35",
    "speaker": "Bibhuti Anand",
    "text": "So yeah, I mean that's why there is a dependency because we don't."
  },
  {
    "time": "34:39",
    "speaker": "Bibhuti Anand",
    "text": "Have our in house text to speech."
  },
  {
    "time": "34:42",
    "speaker": "Bibhuti Anand",
    "text": "Model but we have, we can use server or any other provider for that."
  },
  {
    "time": "34:47",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "And which language model are you using?"
  },
  {
    "time": "34:50",
    "speaker": "Bibhuti Anand",
    "text": "Of language model we are primarily using LLAMA but then for certain tasks we are also using smaller language models like Phi and the OpenAI open source version."
  },
  {
    "time": "35:02",
    "speaker": "Bibhuti Anand",
    "text": "But primarily we are using Llama."
  },
  {
    "time": "35:05",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "What version of Llama."
  },
  {
    "time": "35:08",
    "speaker": "Bibhuti Anand",
    "text": "4?"
  },
  {
    "time": "35:09",
    "speaker": "Bibhuti Anand",
    "text": "I think 4 or 4.1 is being used."
  },
  {
    "time": "35:21",
    "speaker": "Bibhuti Anand",
    "text": "Okay."
  },
  {
    "time": "35:21",
    "speaker": "Bibhuti Anand",
    "text": "If you want to test the voice board, we can set up something and we can share with you a link to test or you know, even for this real time assistance we are very happy to just create a test setup so that you know, you can test."
  },
  {
    "time": "35:35",
    "speaker": "Bibhuti Anand",
    "text": "It on your own and gain the confidence that the system is actually able."
  },
  {
    "time": "35:38",
    "speaker": "Bibhuti Anand",
    "text": "To generate the responses."
  },
  {
    "time": "35:42",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "We would be testing out then if you share the link for that."
  },
  {
    "time": "35:46",
    "speaker": "Bibhuti Anand",
    "text": "So, so for example, when Indus and Guys wanted to test it, they provided us one particular policy, this Reliance Health Gain and we trained the system on that particular policy document and then they, during the testing they asked a lot of questions on that policy."
  },
  {
    "time": "36:02",
    "speaker": "Bibhuti Anand",
    "text": "So any document, you know, any insurance policy or you if you have a wealth management research report or a process document for lending, you know, anything."
  },
  {
    "time": "36:13",
    "speaker": "Bibhuti Anand",
    "text": "And then we would just train the."
  },
  {
    "time": "36:14",
    "speaker": "Bibhuti Anand",
    "text": "Model on that and you can test it."
  },
  {
    "time": "36:21",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Yeah, we can do that."
  },
  {
    "time": "36:25",
    "speaker": "Bibhuti Anand",
    "text": "Awesome."
  },
  {
    "time": "36:25",
    "speaker": "Bibhuti Anand",
    "text": "Sure."
  },
  {
    "time": "36:26",
    "speaker": "Bibhuti Anand",
    "text": "So we'll be happy to set it."
  },
  {
    "time": "36:28",
    "speaker": "Bibhuti Anand",
    "text": "Up, just share the document and then."
  },
  {
    "time": "36:30",
    "speaker": "Bibhuti Anand",
    "text": "Rest of the things would take care of."
  },
  {
    "time": "36:32",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "If I share any website link to you and you can train that and if I can ask question that works?"
  },
  {
    "time": "36:39",
    "speaker": "Bibhuti Anand",
    "text": "Yeah, yeah, works."
  },
  {
    "time": "36:43",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Summary on that website only."
  },
  {
    "time": "36:44",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "So I'll share the link and then we can test it out."
  },
  {
    "time": "36:48",
    "speaker": "Bibhuti Anand",
    "text": "Sure, sure, yeah."
  },
  {
    "time": "36:53",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Any more questions for me?"
  },
  {
    "time": "36:57",
    "speaker": "Bibhuti Anand",
    "text": "No, I, I don't have any questions right now."
  },
  {
    "time": "36:59",
    "speaker": "Bibhuti Anand",
    "text": "I mean, see we understand we are a small player probably, you know, we might not be as mature as."
  },
  {
    "time": "37:09",
    "speaker": "Bibhuti Anand",
    "text": "Let'S say a Microsoft or a Google, you know, in terms of a lot of the processes."
  },
  {
    "time": "37:13",
    "speaker": "Bibhuti Anand",
    "text": "But we have deep expertise in this system."
  },
  {
    "time": "37:16",
    "speaker": "Bibhuti Anand",
    "text": "We have built everything keeping Indian finance in mind and for Indian financial services we have ensured that all the constraints that you have."
  },
  {
    "time": "37:26",
    "speaker": "Bibhuti Anand",
    "text": "For example, from the very beginning were clear that we are going to build using open source systems."
  },
  {
    "time": "37:32",
    "speaker": "Bibhuti Anand",
    "text": "We are going to ensure that There."
  },
  {
    "time": "37:34",
    "speaker": "Bibhuti Anand",
    "text": "Are no third party APIs involved and."
  },
  {
    "time": "37:36",
    "speaker": "Bibhuti Anand",
    "text": "Everything could be deployed on any GPU that you want."
  },
  {
    "time": "37:39",
    "speaker": "Bibhuti Anand",
    "text": "All those enterprise challenges, regulatory concerns we have taken care of, we can assure you on that."
  },
  {
    "time": "37:47",
    "speaker": "Bibhuti Anand",
    "text": "Then we would want you to test it out."
  },
  {
    "time": "37:50",
    "speaker": "Bibhuti Anand",
    "text": "Right."
  },
  {
    "time": "37:50",
    "speaker": "Bibhuti Anand",
    "text": "So only way that you'd gain confidence is by actually testing the system and we are more than happy to support that to the extent possible."
  },
  {
    "time": "37:59",
    "speaker": "Bibhuti Anand",
    "text": "So once you share the documents, we would set up the entire thing and we would provide you the link to test it on your own and to get the confidence that yeah, it actually works."
  },
  {
    "time": "38:11",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "What was the accuracy rate of POC with Indus and Bank?"
  },
  {
    "time": "38:15",
    "speaker": "Bibhuti Anand",
    "text": "Sorry?"
  },
  {
    "time": "38:16",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "The accuracy of POC done with Indus."
  },
  {
    "time": "38:19",
    "speaker": "Bibhuti Anand",
    "text": "And so for Indus and the accuracy is."
  },
  {
    "time": "38:23",
    "speaker": "Bibhuti Anand",
    "text": "If you measure accuracy in terms of."
  },
  {
    "time": "38:26",
    "speaker": "Bibhuti Anand",
    "text": "Answering the user query, it's almost at."
  },
  {
    "time": "38:29",
    "speaker": "Bibhuti Anand",
    "text": "100% accuracy right now."
  },
  {
    "time": "38:31",
    "speaker": "Bibhuti Anand",
    "text": "And not just in English or Hindi but we are now testing it for multiple Indian languages like Marathi and Kannad."
  },
  {
    "time": "38:38",
    "speaker": "Bibhuti Anand",
    "text": "And across these languages we have very high accuracy of."
  },
  {
    "time": "38:44",
    "speaker": "Bibhuti Anand",
    "text": "So for Hindi and English it's almost 100%."
  },
  {
    "time": "38:47",
    "speaker": "Bibhuti Anand",
    "text": "For some of the other languages it can drop to 95%."
  },
  {
    "time": "38:51",
    "speaker": "Bibhuti Anand",
    "text": "But this accuracy I'm mentioning in terms of the accuracy of the answer, not the raw transcription accuracy."
  },
  {
    "time": "38:58",
    "speaker": "Bibhuti Anand",
    "text": "Sometimes transcription might be a bit off."
  },
  {
    "time": "39:01",
    "speaker": "Bibhuti Anand",
    "text": "But the model is intelligent enough to."
  },
  {
    "time": "39:03",
    "speaker": "Bibhuti Anand",
    "text": "Figure out what was the user's question."
  },
  {
    "time": "39:05",
    "speaker": "Bibhuti Anand",
    "text": "And create the response correctly."
  },
  {
    "time": "39:13",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "So allow me, you know, to have a discussion on this."
  },
  {
    "time": "39:17",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "So I've got a gist of this and I will have a discussion and get back on this."
  },
  {
    "time": "39:24",
    "speaker": "Bibhuti Anand",
    "text": "Sure."
  },
  {
    "time": "39:26",
    "speaker": "Bibhuti Anand",
    "text": "Look forward to hearing from you."
  },
  {
    "time": "39:27",
    "speaker": "Bibhuti Anand",
    "text": "Ramesh, thank you so much for your."
  },
  {
    "time": "39:28",
    "speaker": "Bibhuti Anand",
    "text": "Time and yeah, let me know whenever."
  },
  {
    "time": "39:31",
    "speaker": "Bibhuti Anand",
    "text": "You want to if you have any."
  },
  {
    "time": "39:33",
    "speaker": "Bibhuti Anand",
    "text": "Questions or any concerns, we are always available."
  },
  {
    "time": "39:38",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Sure."
  },
  {
    "time": "39:38",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Thank you."
  },
  {
    "time": "39:39",
    "speaker": "Rameezuddin Chaudhary     SEI_SGIBANKBKC",
    "text": "Thank you for your time as well."
  },
  {
    "time": "39:41",
    "speaker": "Bibhuti Anand",
    "text": "Thank you so much."
  },
  {
    "time": "39:45",
    "speaker": "Bibhuti Anand",
    "text": "Thanks."
  },
  {
    "time": "39:46",
    "speaker": "Bibhuti Anand",
    "text": "Bye."
  }
]

export const assessmentData: AssessmentItem[] = [
  {
    id: 0,
    label: "Need Analysis",
    score: 7.5,
    color: "bg-yellow-500",
    icon: <TargetIcon />,
    topics: [
      {
        name: "Asset Vertical",
        sentiment: "positive",
        analysis:
          "Correctly identified the 'Asset/Lending' focus early on. You adapted your language to mention 'Loans' instead of just Insurance.",
      },
      {
        name: "Real-time vs Post-facto",
        sentiment: "negative",
        analysis:
          "Missed the client's explicit prioritization of 'Real-Time' over 'Post-Facto' initially. You spent 3 minutes pitching the post-call dashboard before the client had to correct you.",
      },
      {
        name: "Lead History",
        sentiment: "negative",
        analysis:
          "Client requested prioritization based on 'History'. You acknowledged this but didn't dig deep enough into what specific history parameters (e.g., last loan amount, repayment status) they care about.",
      },
      {
        name: "Text Input Mode",
        sentiment: "negative",
        analysis:
          "Client asked for 'Text Input' instead of Voice. This is a crucial workflow constraint you noted, but didn't explore *why* (e.g., do they have legacy desktops without mics?).",
      },
    ],
  },
  {
    id: 1,
    label: "Product Knowledge",
    score: 8.5,
    color: "bg-green-500",
    icon: <BookIcon />,
    topics: [
      {
        name: "Open Source / GPU",
        sentiment: "positive",
        analysis:
          "Strong command of the tech stack. You confidently explained the 'On-premise GPU' and 'No Wrapper' architecture, which is a key selling point for banks.",
      },
      {
        name: "Demo Asset Mismatch",
        sentiment: "negative",
        analysis:
          "You introduced the Voicebot demo as a 'Logistics' client use-case, but the audio played 'IIFL Securities' (Finance). This lack of attention to detail confuses the prospect and undermines professional credibility.",
      },
      {
        name: "Sarvam AI (TTS)",
        sentiment: "positive",
        analysis:
          "Good handling of the Voicebot dependency. Instead of hiding it, you openly cited Sarvam AI for TTS, positioning it as a 'best-in-class' integration rather than a weakness.",
      },
      {
        name: "Latency Benchmark",
        sentiment: "positive",
        analysis:
          "You cited '5 seconds' as the outer limit and demonstrated '2 seconds'. This data-backed answer was strong.",
      },
    ],
  },
  {
    id: 2,
    label: "Objection Handling",
    score: 7.0,
    color: "bg-yellow-500",
    icon: <ShieldIcon />,
    topics: [
      {
        name: "Telecalling Gap",
        sentiment: "negative",
        analysis:
          "Weak defense. When admitting 'Real-time for Telecalling isn't live', you pivoted to 'In-Person' too quickly. You should have emphasized the *roadmap* or *beta* status for telecalling to keep interest high.",
      },
      {
        name: "Maturity Concern",
        sentiment: "positive",
        analysis:
          "Client compared you to Google/Microsoft. Your rebuttal focused on 'Indian Context' and 'BFSI Specialization', which was the perfect angle to take.",
      },
      {
        name: "Accuracy Rates",
        sentiment: "positive",
        analysis:
          "Handled the 'IndusInd POC' question well by distinguishing between 'Transcription Accuracy' (95%) and 'Intent Accuracy' (100%).",
      },
    ],
  },
  {
    id: 3,
    label: "Rapport & Empathy",
    score: 6.5,
    color: "bg-orange-500",
    icon: <HeartIcon />,
    topics: [
      {
        name: "Empathy Gap",
        sentiment: "negative",
        analysis:
          "The conversation was highly transactional. You focused entirely on the tech features. When the client paused, you didn't ask 'How is your team coping with current volumes?' to show empathy for their operational pain.",
      },
      {
        name: "Closing Speed",
        sentiment: "negative",
        analysis:
          "When Rameez said 'I don't have questions', you moved to close immediately. A more empathetic closer would have used that space to ask about his personal success metrics for this project.",
      },
      {
        name: "Active Listening",
        sentiment: "negative",
        analysis:
          "You interrupted the client at 04:55 when he was explaining the requirement. Let the client finish their thought fully before jumping to the solution.",
      },
    ],
  },
  {
    id: 4,
    label: "Process Adherence",
    score: 8.5,
    color: "bg-green-500",
    icon: <CheckIcon />,
    topics: [
      {
        name: "Next Steps",
        sentiment: "positive",
        analysis:
          "Secured a clear, actionable next step: 'Training on Website Link'. This is a solid micro-conversion.",
      },
      {
        name: "Buying Process",
        sentiment: "negative",
        analysis:
          "You secured the technical next step (Testing), but missed the commercial alignment. You didn't ask about Budget, Timeline for procurement, or the wider Decision Making Unit (IT/Compliance).",
      },
      {
        name: "Data Privacy",
        sentiment: "positive",
        analysis:
          "Proactively addressed the 'Data' concern by mentioning private GPUs, even before the client raised it as a blocker.",
      },
    ],
  },
]


