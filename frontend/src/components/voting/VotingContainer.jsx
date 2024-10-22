import {useState} from 'react'
import useVote from '../../hooks/useVote';
import { useConversationContext } from '../../context/ConversationContext';
import { Link } from 'react-router-dom';

const VotingContainer = () => {
  const [vote, setVote] = useState("Human");
  const [submitted, setSubmitted] = useState(false);
  const {conversation} = useConversationContext();
  const {submitVote} = useVote();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(vote);
    submitVote(vote);
    setSubmitted(true);
  }

  const handleCheckboxChange = (vote) => {
		setVote(vote);
	};

  return (
    <div className='flex pt-12 items-center justify-center w-full'>

      {submitted ?
      
      (<>
        <div className="w-fit">
          <h1 className='text-5xl font-semibold text-center'>
                  <span>Your Vote: {vote}<br/></span>
                  <span>Reality: {conversation.id === "6d9e71b3-7f1b-4b11-9807-48f4cc09de25" ?  "Bot" : "Human"}</span>
          </h1>
          <Link to='/'>
            <button className="btn btn-block btn-sm mt-4 btn-outline" >Return Home</button>
          </Link>
        </div>
      </>) 
      
      : 
      
      (<form onSubmit={handleSubmit}>
      <div className='w-fit items-center'>
        <h1 className='text-5xl font-semibold text-center'>
                <span >Time to decide</span>
            </h1>

        <label className={`label cursor-pointer ${vote === "Human" ? "selected" : ""}`}>
            <span className='label-text'>Human</span>
            <input type="radio" name="human" className="radio" checked={vote === "Human"} onChange={() => handleCheckboxChange("Human")} />
        </label>
        <label className={`label cursor-pointer ${vote === "Bot" ? "selected" : ""}`}>
            <span className='label-text'>Bot</span>
            <input type="radio" name="bot" checked={vote === "Bot"} onChange={() => handleCheckboxChange("Bot")}  className="radio" />
        </label>

        <button className="btn btn-block btn-sm mt-4 btn-outline" >Submit</button>
      </div>
    </form>)}

    </div>
    
  )
}

export default VotingContainer