import {FC, useEffect, useState} from 'react'
import useInterval from 'use-interval'

import {theme} from '@/app/styles'
import {IWidgetRssFeedItem} from '@/app/widgets/rss-feed'

interface ICarouselProps {
  items: IWidgetRssFeedItem[]
}

const counterFps = 60
const counterAnimationTime = 500
const counterStepDisplayTime = 15000
const counterBaseFrequency = 1000 / counterFps

export const Carousel: FC<ICarouselProps> = ({items}) => {
  const [cachedItems, setCachedItems] = useState<IWidgetRssFeedItem[]>(items)
  const [wereItemsUpdated, setWereItemsUpdated] = useState<boolean>(false)
  const [frequency, setFrequency] = useState<number | null>(counterBaseFrequency)
  const [isHidden, setIsHidden] = useState<boolean>(false)
  const [step, setStep] = useState<number>(0)
  const [percent, setPercent] = useState<number>(0)
  const [pathD, setPathD] = useState<string>('')

  const increase = 1 / ((counterStepDisplayTime / 1000) * counterFps)

  const syncNextStep = (_items: IWidgetRssFeedItem[], _wereItemsUpdated: boolean) => {
    setTimeout(() => {
      setIsHidden(true)
    }, counterAnimationTime * 2)
    setTimeout(() => {
      setStep((_step) => {
        if (_step + 1 < items.length) return _step + 1
        else {
          if (_wereItemsUpdated) {
            setCachedItems(_items)
            setWereItemsUpdated(false)
          }

          return 0
        }
      })
    }, counterAnimationTime * 3)
    setTimeout(() => {
      setPercent(0)
      setIsHidden(false)
      setFrequency(counterBaseFrequency)
    }, counterAnimationTime * 4)
  }

  useInterval(() => {
    if (percent <= 1) {
      setPercent(Math.min(1, percent + increase))

      const endX = Math.cos(2 * Math.PI * percent)
      const endY = Math.sin(2 * Math.PI * percent)
      const largeArcFlag = percent > 0.5 ? 1 : 0

      setPathD(`M 1 0 A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`)
    }
    if (percent === 1) {
      setFrequency(null)
      syncNextStep(items, wereItemsUpdated)
    }
  }, frequency)
  useEffect(() => {
    setWereItemsUpdated(true)
  }, [items])

  return (
    <>
      <ul
        css={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          textAlign: 'left',
          opacity: isHidden ? 0 : 1,
          transition: `${counterAnimationTime}ms opacity`,
        }}
      >
        {cachedItems.map(({contentSnippet, title}, i) => (
          <li key={i} css={{display: step === i ? 'block' : 'none'}}>
            <p>{title}</p>
            <p css={{marginTop: theme.spacing.xs, fontSize: theme.font.size.sub, color: theme.color.faded}}>{contentSnippet}</p>
          </li>
        ))}
      </ul>
      <div
        css={{
          display: 'flex',
          alignSelf: 'start',
          columnGap: theme.spacing.s,
          marginTop: theme.spacing.s,
          fontSize: theme.font.size.sub,
          color: theme.color.faded,
        }}
      >
        <div
          css={{
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '14rem',
              height: '14rem',
              border: '2rem solid',
              borderColor: theme.color.foreground,
              borderRadius: '50%',
            },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 -1 2 2"
            css={{display: 'block', width: '14rem', height: '14rem', transform: 'rotate(-90deg)'}}
          >
            <path
              fill={theme.color.foreground}
              d={pathD}
              css={{opacity: isHidden ? 0 : 1, transition: `${counterAnimationTime}ms opacity`}}
            />
          </svg>
        </div>
        {step + 1} z {items.length}
      </div>
    </>
  )
}
