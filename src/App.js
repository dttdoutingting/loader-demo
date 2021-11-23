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
  return (
    <div className="App">
      <Button type="primary">Button</Button>
      <Test />
    </div>
  )
}

export default App
