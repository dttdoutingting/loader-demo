import React, { useState } from 'react'
import { Button as AButton, Input, Radio as ARadio } from 'antd'

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

const Test = () => {
  return (
    <div>
      <AButton>测试</AButton>
      <Input placeholder="Basic usage" />
      <ARadio>Radio</ARadio>
    </div>
  )
}

export default Test
