import * as menu from "@zag-js/menu"
import '../../../../style/context-menu/index.css'
import { useMachine, normalizeProps } from "@zag-js/react"
import { useId } from "react"

const Page = () => {
  const [state, send] = useMachine(
    menu.machine({
      id: useId(),
    }),
  )
  const api = menu.connect(state, send, normalizeProps)

  return (
    <div>
      <div {...api.contextTriggerProps}>Right Click here</div>
        <div {...api.positionerProps}>
          <div className="content-bg"></div>
          <ul className="focus-outline" {...api.contentProps}>
            <li {...api.getItemProps({ id: "edit" })}>Edit</li>
            <li {...api.getItemProps({ id: "duplicate" })}>Duplicate</li>
            <li {...api.getItemProps({ id: "delete" })}>Delete</li>
            <li {...api.getItemProps({ id: "export" })}>Export...</li>
          </ul>
        </div>
    </div>
  )
}

export default Page
