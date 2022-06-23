import { createChannel } from '../node_modules/decentraland-builder-scripts/channel'
import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'
import Script1 from "../3f3fe65b-c648-44bc-8781-c2a40bc95bb4/src/item"
import Script2 from "../1ab2733f-1782-4521-9eda-6aa8ad684277/src/item"

const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)

const entity = new Entity('entity')
engine.addEntity(entity)
entity.setParent(_scene)
const gltfShape = new GLTFShape("c9b17021-765c-4d9a-9966-ce93a9c323d1/FloorBaseGrass_01/FloorBaseGrass_01.glb")
gltfShape.withCollisions = true
gltfShape.isPointerBlocker = true
gltfShape.visible = true
entity.addComponentOrReplace(gltfShape)
const transform2 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity.addComponentOrReplace(transform2)

const signpostRoot = new Entity('signpostRoot')
engine.addEntity(signpostRoot)
signpostRoot.setParent(_scene)
const transform3 = new Transform({
  position: new Vector3(8, 0, 10),
  rotation: new Quaternion(-4.9053253456778426e-15, 1, -1.1920927533992653e-7, 0),
  scale: new Vector3(1.0000009536743164, 1, 1.0000009536743164)
})
signpostRoot.addComponentOrReplace(transform3)

const triggerArea = new Entity('triggerArea')
engine.addEntity(triggerArea)
triggerArea.setParent(_scene)
const transform4 = new Transform({
  position: new Vector3(8, 0, 6.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(3.7350001335144043, 2.490000009536743, 6.224999904632568)
})
triggerArea.addComponentOrReplace(transform4)

const channelId = Math.random().toString(16).slice(2)
const channelBus = new MessageBus()
const inventory = createInventory(UICanvas, UIContainerStack, UIImage)
const options = { inventory }

const script1 = new Script1()
const script2 = new Script2()
script1.init(options)
script2.init(options)
script1.spawn(signpostRoot, {"text":"Walk this way","fontSize":20}, createChannel(channelId, signpostRoot, channelBus))
script2.spawn(triggerArea, {"enabled":true,"onEnter":[{"entityName":"signpostRoot","actionId":"changeText","values":{"newText":"Hi there!"}}],"onLeave":[{"entityName":"signpostRoot","actionId":"changeText","values":{"newText":"Leaving so soon?"}}]}, createChannel(channelId, triggerArea, channelBus))