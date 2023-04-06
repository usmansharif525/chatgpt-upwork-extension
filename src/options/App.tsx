import {
  CssBaseline,
  GeistProvider,
  Input,
  Radio,
  Select,
  Text,
  Themes,
  Toggle,
  useToasts,
} from '@geist-ui/core'
import { BugIcon, LogIcon, MarkGithubIcon, PaperAirplaneIcon } from '@primer/octicons-react'
import { capitalize } from 'lodash-es'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import '../base.css'
import {
  getUserConfig,
  Language,
  Theme,
  TriggerMode,
  TRIGGER_MODE_TEXT,
  updateUserConfig,
} from '../config'
import logo from '../logo.png'
import { detectSystemColorScheme, getExtensionVersion } from '../utils'
import ProviderSelect from './ProviderSelect'

function OptionsPage(props: { theme: Theme; onThemeChange: (theme: Theme) => void }) {
  const [triggerMode, setTriggerMode] = useState<TriggerMode>(TriggerMode.Always)
  const [language, setLanguage] = useState<Language>(Language.Auto)
  const [name, setName] = useState<string>('')
  const { setToast } = useToasts()

  useEffect(() => {
    getUserConfig().then((config) => {
      setTriggerMode(config.triggerMode)
      setLanguage(config.language)
      setName(config.name)
    })
  }, [])

  const onTriggerModeChange = useCallback(
    (mode: TriggerMode) => {
      setTriggerMode(mode)
      updateUserConfig({ triggerMode: mode })
      setToast({ text: 'Changes saved', type: 'success' })
    },
    [setToast],
  )

  const onThemeChange = useCallback(
    (theme: Theme) => {
      updateUserConfig({ theme })
      props.onThemeChange(theme)
      setToast({ text: 'Changes saved', type: 'success' })
    },
    [props, setToast],
  )

  const onLanguageChange = useCallback(
    (language: Language) => {
      updateUserConfig({ language })
      setToast({ text: 'Changes saved', type: 'success' })
    },
    [setToast],
  )

  const onNameChange = useCallback((name: string) => {
    setName(name)
    updateUserConfig({ name })
  }, [])

  return (
    <div className="container mx-auto">
      <nav className="flex flex-row justify-between items-center mt-5 px-2">
        <div className="flex flex-row items-center gap-2">
          <img src={logo} className="w-10 h-10 rounded-lg" />
          <span className="font-semibold">
            ChatGPT for Upwork  (v{getExtensionVersion()})
          </span>
        </div>
        <div className="flex flex-row gap-3">
          <a
            href="https://https://github.com/usmansharif525/chatgpt-upwork-extension/changelog"
            target="_blank"
            className="bg-white hover:bg-gray-100 text-gray-800 font-medium  py-2 px-4 border border-gray-500 rounded shadow"
            rel="noreferrer"
          >
            <LogIcon size={20} className="inline-block mr-2  text-sm" />
            Changelog
          </a>
          <a
            href="https://github.com/usmansharif525/chatgpt-upwork-extension/issues"
            target="_blank"
            className="bg-yellow-500 hover:bg-yellow-400 text-gray-800 font-medium  py-2 px-4 border border-gray-500 rounded shadow"
            rel="noreferrer"
          >
            <BugIcon size={20} className="inline-block mr-2  text-sm" />
            Report issue
          </a>
          <a
            href="https://twitter.com/ItsUsmanSharif"
            target="_blank"
            className="bg-[#1D9BF0] hover:bg-[#4EADED] text-gray-800 font-medium  py-2 px-4 border border-gray-500 rounded shadow"
            rel="noreferrer"
          >
            <PaperAirplaneIcon size={20} className="inline-block mr-2  text-sm" />
            Twitter
          </a>
          <a
            href="https://github.com/usmansharif525/chatgpt-upwork-extension"
            target="_blank"
            className="bg-[#0d1117] hover:bg-[#161b22] text-white font-medium py-2 px-4 border border-gray-300 rounded shadow"
            rel="noreferrer"
          >
            <MarkGithubIcon size={20} className="inline-block mr-2 text-sm" />
            Source code
          </a>
        </div>
      </nav>
      <main className=" mx-auto mt-14 container">
        <Text h2 className="mb-6 text-center">
          Extension Settings
        </Text>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-2 border border-gray-700 border-dashed py-5 px-4 rounded-lg">
              <Text h4 className="">
                Name
              </Text>
              <Text className="my-1">The name used in Upwork bids/proposals.</Text>
              <Input width={'100%'} onChange={(e) => onNameChange(e.target.value)} value={name} />
            </div>
            <div className="mb-2 border border-gray-700 border-dashed py-5 px-4 rounded-lg">
              <Text h4 className="">
                Trigger Mode
              </Text>
              <Radio.Group
                font={0.8}
                value={triggerMode}
                onChange={(val) => onTriggerModeChange(val as TriggerMode)}
              >
                {Object.entries(TRIGGER_MODE_TEXT).map(([value, texts]) => {
                  return (
                    <Radio key={value} value={value}>
                      {texts.title}
                      <Radio.Description>{texts.desc}</Radio.Description>
                    </Radio>
                  )
                })}
              </Radio.Group>
            </div>
            <div className="mb-2 border border-gray-700 border-dashed py-5 px-4 rounded-lg">
              <Text h4 className="">
                Theme
              </Text>
              <Radio.Group
                font={0.8}
                value={props.theme}
                onChange={(val) => onThemeChange(val as Theme)}
                useRow
              >
                {Object.entries(Theme).map(([k, v]) => {
                  return (
                    <Radio key={v} value={v}>
                      {k}
                    </Radio>
                  )
                })}
              </Radio.Group>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="mb-2 border border-gray-700 border-dashed py-5 px-4 rounded-lg">
              <Text h4 className="">
                AI Provider
              </Text>
              <ProviderSelect />
            </div>
            <div className="mb-2 border border-gray-700 border-dashed py-5 px-4 rounded-lg">
              <Text h4 className="">
                Misc
              </Text>
              <div className="flex flex-row items-center gap-4">
                <Toggle initialChecked disabled />
                <Text b margin={0}>
                  Auto delete conversations generated by search
                </Text>
              </div>
            </div>

            <div className="mb-2 border border-gray-700 border-dashed py-5 px-4 rounded-lg">
              <Text h4 className="">
                Language
              </Text>
              <Text className="my-1">
                The language used in ChatGPT response. <span className="italic">Auto</span> is
                recommended.
              </Text>
              <Select
                value={language}
                placeholder="Choose one"
                onChange={(val) => onLanguageChange(val as Language)}
              >
                {Object.entries(Language).map(([k, v]) => (
                  <Select.Option key={k} value={v}>
                    {capitalize(v)}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState(Theme.Auto)

  const themeType = useMemo(() => {
    let themeName
    if (theme === Theme.Auto) {
      themeName = detectSystemColorScheme()
    } else {
      themeName = theme
    }
    return themeName === Theme.Dark ? 'darkCustom' : 'lightCustom'
  }, [theme])

  // const customTheme = {
  //   type: themeType,
  //   palette: {
  //     background: {
  //       default: themeType === 'dark' ? '#0d1117' : '#f7fafc',
  //       card: themeType === 'dark' ? '#161b22' : '#ffffff',
  //     },
  //   },
  //   ...theme
  // }

  let themes = Themes.getPresets()
  const customDarkTheme = Themes.createFromDark({
    type: 'darkCustom',
    palette: {
      background: '#0d1117',
      foreground: '#f7fafc',
      border: '#374151',
    },
  })

  const customLightTheme = Themes.createFromLight({
    type: 'lightCustom',
    palette: {
      foreground: '#161b22',
      background: '#f7fafc',
      border: '#374151',
    },
  })

  themes = [customDarkTheme, customLightTheme, ...themes]

  useEffect(() => {
    getUserConfig().then((config) => setTheme(config.theme))
  }, [])

  return (
    <GeistProvider themes={themes} themeType={themeType}>
      <CssBaseline />
      <OptionsPage theme={theme} onThemeChange={setTheme} />
    </GeistProvider>
  )
}

export default App
