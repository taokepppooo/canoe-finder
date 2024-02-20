import * as menu from "@zag-js/menu"
import '@cf/ui/style/context-menu/index.css'
import { useMachine, normalizeProps } from "@zag-js/react"

const Page = () => {
  const [state, send] = useMachine(
    menu.machine({
      id:'1',
      "aria-label": "File",
    }),
  )
  const api = menu.connect(state, send, normalizeProps)


  return (
    <div>
      <div {...api.contextTriggerProps}>
        <div>Open context menu</div>
      </div>
      <div {...api.positionerProps}>
        <ul {...api.contentProps}>
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
