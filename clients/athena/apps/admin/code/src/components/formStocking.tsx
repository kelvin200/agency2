import { makeVar, useQuery, useReactiveVar } from '@apollo/client'
import { Form, FormInstance, Input, Radio } from 'antd'
import React, { useState } from 'react'

import { GET } from './gql'

const initVars: { key?: React.Key } = {
  key: '',
}

export const queryVars = makeVar(initVars)

export const useFormStocking = (form: FormInstance<any>) => {
  const [key, _setKey] = useState<React.Key | undefined>(undefined)

  const { data: lsQueryRaw, loading } = useQuery(GET, {
    variables: useReactiveVar(queryVars),
    skip: !key,
  })

  const setKey = (key: React.Key | undefined) => {
    _setKey(key)
    queryVars({ key })
  }

  return {
    setKey,
    comp: (
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="modifier"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    ),
  }
}
