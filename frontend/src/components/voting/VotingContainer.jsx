import { useState } from 'react'
import useVote from '../../hooks/useVote';
import { useConversationContext } from '../../context/ConversationContext';
import { Link } from 'react-router-dom';

const VotingContainer = () => {
  const [vote, setVote] = useState("Human");
  const [submitted, setSubmitted] = useState(false);
  const { conversation } = useConversationContext();
  const { submitVote } = useVote();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          <div className="card bg-primary text-primary-content w-96">
            <div className="card-body">
              <h2 className="text-3xl card-title justify-center"><span >Results</span></h2>
              <h1 className='text-lg text-center'>
                <span>Your Vote: {vote}<br /></span>
                <span>Reality: {conversation.id === "6d9e71b3-7f1b-4b11-9807-48f4cc09de25" ? "Bot" : "Human"}</span>
              </h1>
              <div className="card-actions justify-center">
                <Link className="w-full" to='/'>
                  <button className="mt-4 btn w-full">Return Home</button>
                </Link>
              </div>
            </div>
          </div>
        </>)

        :

        (
          <div className="card bg-primary text-primary-content w-96">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <h2 className="text-3xl card-title justify-center"><span >Time to decide</span></h2>
                <label className={`label text-white cursor-pointer ${vote === "Human" ? "selected" : ""}`}>
                  <span className='label-text text-lg text-white'>Human</span>
                  <input type="radio" name="human" className="radio bg-white" checked={vote === "Human"} onChange={() => handleCheckboxChange("Human")} />
                </label>
                <label className={`label cursor-pointer ${vote === "Bot" ? "selected" : ""}`}>
                  <span className='label-text text-lg text-white'>Bot</span>
                  <input type="radio" name="bot" checked={vote === "Bot"} onChange={() => handleCheckboxChange("Bot")} className="radio bg-white" />
                </label>
                <div className="card-actions justify-center">
                  <button className="btn mt-4 w-full" >Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}

    </div>

  )
}

export default VotingContainer