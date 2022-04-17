import { Form, Modal } from 'antd'
import React, { useState } from 'react'

import { useFormStocking } from './formStocking'

export const useModalStocking = () => {
  const [form] = Form.useForm()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const { comp, setKey } = useFormStocking(form)

  const showModal = (key: React.Key) => {
    console.log({ key })
    setKey(key)
    setIsVisible(true)
  }

  const hideModal = () => {
    setIsVisible(false)
  }

  return {
    showModal,
    modal: (
      <Modal
        visible={isVisible}
        title="Create a new collection"
        okText="Create"
        cancelText="Cancel"
        onCancel={hideModal}
        onOk={() => {
          form
            .validateFields()
            .then(() => {
              form.resetFields()
            })
            .catch(info => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        {comp}
      </Modal>
    ),
  }
}
