import { Gantt } from "./gantt"
import { ganttData } from "./gantt/data"
import { normalize } from "./gantt/utils"

function App() {
  return (
    <Gantt
      data={normalize(ganttData)}
      background="transparent"
      rowHeight={30}
      y={{ color: '#8787875b', lineColor: '#8787875b' }}
      x={{ color: '#8787875b', lineColor: '#8787875b' }}
      grid={{ lineColor: '#8787875b', fill: 'transparent' }}
      scrollSensitivity={10}
      title={{ text: 'Диаграмма Ганта', height: 50 }}
    />
  )
}

export default App
