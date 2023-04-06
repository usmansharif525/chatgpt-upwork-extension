import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react'
import { useState } from 'react'
import { TriggerMode } from '../config'
import ChatGPTCard from './ChatGPTCard'
import { QueryStatus } from './ChatGPTQuery'

interface Props {
  question: string
  triggerMode: TriggerMode
}

function ChatGPTContainer(props: Props) {
  const [queryStatus, setQueryStatus] = useState<QueryStatus>()
  const [showCard, setShowCard] = useState(true)

  return (
    <>
      <div className="chat-gpt-card ">
        <span
          className={`absolute cursor-pointer ${showCard ? 'right-2 top-2' :  'right-2 bottom-2'}`}
          onClick={() => setShowCard(!showCard)}
        >
          {showCard ? <ChevronDownIcon size="small" /> : <ChevronUpIcon size="small" />}
        </span>

        {showCard && (
          <ChatGPTCard
            question={props.question}
            triggerMode={props.triggerMode}
            onStatusChange={setQueryStatus}
          />
        )}
      </div>
    </>
  )
}

export default ChatGPTContainer
