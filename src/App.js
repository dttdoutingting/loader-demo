import React from 'react'
import { Button } from 'antd'
import Test from './Test.jsx'
import './App.css'

const mod = {
  import: () => {},
}

const ChargeInfo = React.lazy(async () => {
  const { ChargeInfo: Test } = await mod.import('pay-components')
})

const ChargeInfoComp = React.lazy(async () => ({
  default: (await mod.import('pay-components')).ChargeInfo,
}))

mod.import('pay-components').then(({ Purchase }) => {
  this.setState({ Purchase })
})

function App() {
  function renderTest() {
    return (
      <div>
        <h2>标题</h2>
        <p>hello world!</p>
      </div>
    )
  }
  return (
    <div className="App">
      {renderTest()}
      <Button type="primary">Button</Button>
      <Test />
      <span>test</span>
      <span>test</span>
      <span>test</span>
      <span>test</span>
      <span>test</span>
    </div>
  )
}

export default App
