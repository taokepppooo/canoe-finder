import * as scrollbar from '../../../../src/scrollbar';
import '@cf/ui/style/scrollbar/index.css'
import { normalizeProps, useMachine } from '@zag-js/react';
import { useId } from "react"

export const Page = () => {
  const [state, send] = useMachine(scrollbar.machine({ id: useId(), width: 400, height: 500 }))
  const api = scrollbar.connect(state, send, normalizeProps)

  const [state2, send2] = useMachine(scrollbar.machine({ id: useId(), width: 400, height: 500 }))
  const api2 = scrollbar.connect(state2, send2, normalizeProps)

  return (
    <>
      <div>scrollbar</div>
      <div className='cf-light-scrollbar' {...api.rootProps}>
        <div {...api.contentProps}>
          <div style={{ wordBreak: 'keep-all' }}>111sadasddddddddddddddddddddddddddd4f111sadasddddddddddddddddddddddddddd4ffffffff111sadasddddddddddddddddddddddddddd4fffffffffffffff</div>
          <div>222</div>
          <div>333</div>
          <div>444</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>444</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>444</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>444</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>444</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>444</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>444</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div {...api.xTrackProps}>
            <div {...api.xThumbProps}></div>
          </div>
          <div {...api.yTrackProps}>
            <div {...api.yThumbProps}></div>
          </div>
        </div>
      </div>
      <div className='cf-light-scrollbar' {...api2.rootProps}>
        <div {...api2.contentProps}>
          <div style={{ wordBreak: 'keep-all' }}>111sadasddddddddddddddddddddddddddd4f111sadasddddddddddddddddddddddddddd4ffffffff111sadasddddddddddddddddddddddddddd4fffffffffffffff</div>
          <div>222</div>
          <div>333</div>
          <div>444</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>444</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>444</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>444</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>444</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>444</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div>444</div>
          <div>555</div>
          <div>666</div>
          <div>777</div>
          <div {...api2.xTrackProps}>
            <div {...api2.xThumbProps}></div>
          </div>
          <div {...api2.yTrackProps}>
            <div {...api2.yThumbProps}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
