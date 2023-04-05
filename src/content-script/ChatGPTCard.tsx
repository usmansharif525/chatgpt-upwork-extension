import { Button } from '@geist-ui/core'
import { GearIcon, LightBulbIcon } from '@primer/octicons-react'
import { useState } from 'preact/hooks'
import { TriggerMode } from '../config'
import ChatGPTQuery, { QueryStatus } from './ChatGPTQuery'
// import { endsWithQuestionMark } from './utils.js'

interface Props {
  question: string
  triggerMode: TriggerMode
  onStatusChange?: (status: QueryStatus) => void
}

function ChatGPTCard(props: Props) {
  const [triggered, setTriggered] = useState(false)
  const [responseSize, setResponseSize] = useState(null)

  if (props.triggerMode === TriggerMode.Always) {
    return <ChatGPTQuery responseSize={null}  question={props.question} onStatusChange={props.onStatusChange} />
  }
  // if (props.triggerMode === TriggerMode.QuestionMark) {
  //   // if (endsWithQuestionMark(props.question.trim())) {
  //   //   return <ChatGPTQuery question={props.question} onStatusChange={props.onStatusChange} />
  //   // }
  //   return (
  //     <p className="icon-and-text">
  //       <LightBulbIcon size="small" /> Trigger ChatGPT by appending a question mark after your query
  //     </p>
  //   )
  // }
  if (triggered) {
    return <ChatGPTQuery responseSize={responseSize} question={props.question} onStatusChange={props.onStatusChange} />
  }
  return (
    <div className="markdown-body gpt-markdown" id="gpt-answer" dir="auto">
      <p className="icon-and-text">
        <LightBulbIcon size="small" /> Click the button below to generate a bid for this job.
      </p>
      <p>
        Many people don&apos;t like read long proposals, <br />
        you can specify a response size here in words:
        <input
          type="number"
          className="size-input"
          onChange={(e: any) => setResponseSize(e.target.value)}
          placeholder="Response size e.g. 500"
          min="50"
        />
      </p>
      <Button className="icon-and-text cursor-pointer generate-btn" onClick={() => setTriggered(true)}>
        Generate Bid
      </Button>
      </div>
  )
}

export default ChatGPTCard
