export type Props = {
  text?: string
  fontSize?: number
}

type ChangeTextType = { newText: string }

export default class SignPost implements IScript<Props> {
  init() {}

  spawn(host: Entity, props: Props, channel: IChannel) {
    const sign = new Entity()
    sign.setParent(host)

    sign.addComponent(new GLTFShape('3f3fe65b-c648-44bc-8781-c2a40bc95bb4/models/signpost/Signpost_Root.glb'))

    let signText = new Entity()
    signText.setParent(host)
    let text = new TextShape(props.text)
    text.fontSize = props.fontSize
    text.color = Color3.White()

    text.width = 20
    text.height = 10
    text.hTextAlign = 'center'

    signText.addComponent(text)

    signText.addComponent(
      new Transform({
        position: new Vector3(-0.1, 1.3, 0.3),
        rotation: Quaternion.Euler(0, 180, 0),
        scale: new Vector3(0.05, 0.05, 0.05)
      })
    )

    // Updates item for all players in scene
    channel.handleAction<ChangeTextType>('changeText', action => {
      text.value = action.values.newText
    })

    // Updates item only for player invoking action in scene
    channel.handleAction<ChangeTextType>('updateText', action => {
      if (action.sender === channel.id) {
        text.value = action.values.newText
      }
    })

    channel.request<string>('getText', signText => (text.value = signText))
    channel.reply<string>('getText', () => text.value)
  }
}
