import { render } from 'preact'
import '../base.css'
import { getUserConfig, Theme } from '../config'
import { detectSystemColorScheme } from '../utils'
import ChatGPTContainer from './ChatGPTContainer'
import { config } from './site-configs'
import './styles.scss'
import { getPossibleElementByQuerySelector, getPossibleElementsByQuerySelectorAll } from './utils'

const siteConfig = config

async function mount(question: string) {
  const container = document.createElement('div')
  container.className = 'chat-gpt-container'

  const userConfig = await getUserConfig()
  let theme: Theme
  if (userConfig.theme === Theme.Auto) {
    theme = detectSystemColorScheme()
  } else {
    theme = userConfig.theme
  }
  // if (theme === Theme.Dark) {
  //   container.classList.add('gpt-dark')
  // } else {
    container.classList.add('gpt-light')
  // }

  const mainContainer = getPossibleElementByQuerySelector(siteConfig.mainContainer)
  if (mainContainer) {
    mainContainer.prepend(container)
  } else {
    document.body.prepend(container)
  }

  render(
    <ChatGPTContainer question={question} triggerMode={userConfig.triggerMode || 'manually'} />,
    container,
  )
}

async function loadJobDescription() {
  // load description
  // return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      const moreDescription = getPossibleElementByQuerySelector<HTMLInputElement>(
        siteConfig.moreDescription,
      )
      if (moreDescription) {
        clearInterval(interval)
        moreDescription.click()
        return true
      }
      // reject(false)
    }, 1000)
  // })
}

function getJobDetail() { 
  console.log('getJobDetail')

  const jobDescription = getPossibleElementByQuerySelector<HTMLElement>(
    siteConfig.jobDescription,
  )?.innerText

  const jobTitle = getPossibleElementByQuerySelector<HTMLElement>(
    siteConfig.jobTitle,
  )?.innerText

  // getPossibleElementsByQuerySelectorAll should return an array
  const jobSkills = getPossibleElementsByQuerySelectorAll<any>(
    siteConfig.jobSkills
  )?.map((skill:HTMLElement) => skill.innerText)

  return [jobDescription , jobTitle , jobSkills]
}

async function run() {
  mount('What is Your Name?')
  // await loadJobDescription()
  // const jobDetail = getJobDetail()
  // console.log('searchValueWithLanguageOption', jobDetail)
  // const responseLength = 500;
  // if(!jobDetail[0] || !jobDetail[1]) {
  //   return
  // }
  // const gptQuery = `
  //   It's an Upwork job, please help me write a cover letter for it. Thank you!
  //   My Name: Usman Sharif,
  //   Client Name: GMS Technology,
  //   ${responseLength ? `Response Length: ${responseLength},` : ''}
  //   Job Title: ${jobDetail[1]},
  //   Job Skills: ${jobDetail[2]?.join(', ')}
  //   Job Description: ${jobDetail[0]},
  // `
  // console.log('gptQuery', gptQuery)
  
  // if (searchValueWithLanguageOption) {
  //   mount(searchValueWithLanguageOption)
  // }
  // const userConfig = await getUserConfig()
  //
}

run()

// if (siteConfig.watchRouteChange) {
//   siteConfig.watchRouteChange(run)
// }
