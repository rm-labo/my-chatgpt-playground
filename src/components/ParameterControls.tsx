import { Icon } from '@iconify/react'
import { Input, Select, Textarea, NumberInput, Slider, Tooltip, Switch, Button } from '@mantine/core'
import { OpenAIApi } from 'openai'
import React, { useState, useEffect } from 'react'
import { useParameterControlsContext } from '@/contexts/parameterControlsContext'

type Props = {}

const OptionDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <p className="text-micro opacity-50 mt-2">
      <small>{children}</small>
    </p>
  )
}

export const ParameterControls: React.FC<Props> = () => {
  const {
    chatCompletionOption,
    setModel,
    setTemperature,
    setTopP,
    setN,
    setStream,
    setStop,
    setMaxTokens,
    setPresencePenalty,
    setFrequencyPenalty,
    // setLogitBias,
    // setUser,
  } = useParameterControlsContext()

  const [debugValue, setDebugValue] = useState(chatCompletionOption)

  const [stopArray, setStopArray] = useState<string[]>(['', '', '', ''])

  useEffect(() => {
    setDebugValue(chatCompletionOption)
  }, [chatCompletionOption])

  const handleStreamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStream(event.target.checked)
  }

  const handleStopChange = (event: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const newArray = [...stopArray]
    newArray[index] = event.target.value
    setStopArray(newArray)

    const filteredArray = newArray.filter((value) => value.trim() !== '')

    if (filteredArray.length === 0) {
      console.log('Submitted Array:', null)
      setStop(null)
    } else {
      console.log('Submitted Array:', filteredArray)
      setStop(filteredArray)
    }
  }

  // const handleLogitBiasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const [id, value] = event.target.value.split(':')
  //   const parsedId = parseInt(id)
  //   const parsedValue = parseFloat(value)
  //   setLogitBias({ ...chatCompletionOption.logit_bias, [parsedId]: parsedValue })
  // }

  // const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUser(event.target.value)
  // }

  return (
    <div className="flex flex-col gap-4">
      <Button
        component="a"
        target="blank"
        href="https://platform.openai.com/docs/api-reference/chat/create"
        color="gray"
        compact
        variant="outline"
      >
        <Icon icon="logos:openai-icon" className="mr-2" />
        api-reference
      </Button>

      <div className="text-micro bg-gray-900 text-white p-4">
        <pre>
          <code>{JSON.stringify(debugValue, null, 2)}</code>
        </pre>
      </div>
      <div>
        {/* TODO: https://platform.openai.com/docs/api-reference/models */}
        <Select
          id="model"
          label="Model:"
          defaultValue="'gpt-3.5-turbo'"
          size="xs"
          data={['gpt-3.5-turbo']}
          value={chatCompletionOption.model}
          onChange={setModel}
          withAsterisk
        />
        <OptionDescription>
          <small>gpt-3.5-turbo もしくは gpt-3.5-turbo-0301 のみ対応</small>
        </OptionDescription>
      </div>
      <div>
        <Tooltip label="">
          <Input.Wrapper size="xs" label="Temperature:">
            <Slider
              className="mb-6"
              id="temperature"
              min={0}
              max={1}
              step={0.01}
              size="sm"
              value={chatCompletionOption.temperature}
              onChange={setTemperature}
              marks={[
                { value: 0, label: '0' },
                { value: 1, label: '1' },
              ]}
            />
          </Input.Wrapper>
        </Tooltip>
        <OptionDescription>
          サンプリング温度(※)を 0〜1 の間で指定します。
          <br />
          値が低いほど、より関連性の高い単語が選ばれやすくなり、値が高いほど、より多様な単語が選ばれやすくなります。
          <br />
          この値か top_p パラメーター を変更することを推奨していますが、両方は同時に変更することは推奨されません。
          <br />
          <br />
          ※サンプリング温度について
          <br />
          文章生成時に使用される確率分布の調整パラメーターの一つで、生成される文章の多様性や不確実性を調整するために使用されます。
          <br />
          サンプリング温度が低い場合、より一貫性がある文章が生成され、単語の組み合わせの変化が少なくなります。
          <br />
          サンプリング温度が高い場合、より多様な文章が生成され、単語の組み合わせがより多様になります。
          <br />
          ちなみに、ChatGPT のデフォルトは 0.7 です。
          <br />
        </OptionDescription>
      </div>
      <div>
        <Input.Wrapper size="xs" label="top_p:">
          <Slider
            className="mb-6"
            id="top_p"
            min={0}
            max={1}
            step={0.01}
            size="sm"
            value={chatCompletionOption.top_p}
            onChange={setTopP}
            marks={[
              { value: 0, label: '0' },
              { value: 1, label: '1' },
            ]}
          />
        </Input.Wrapper>
        <OptionDescription>
          サンプリング温度に代わるものとして利用されます。
          <br />
          値が小さいほど、生成される文章は文法的により正確になります。
          <br />
          値が大きいほど、より多様な単語が選択されるため、生成される文章はより多様になります。
          <br />
          tenperature パラメーターとの併用は推奨されていません。
          <br />
          ちなみに ChatGPT のデフォルトは 0.9~0.95 です。
          <br />
        </OptionDescription>
      </div>
      <div>
        <NumberInput label="N:" id="n" value={chatCompletionOption.n} onChange={setN} size="xs" min={1} />
        <OptionDescription>
          各入力メッセージに対して生成するチャット補完の選択肢の数を設定します。
          <br />
          3にすれば3つ返答を返してくれます。
        </OptionDescription>
      </div>
      <div>
        <Input.Wrapper size="xs" label="Stream:">
          <Switch className="py-2" size="xs" checked={chatCompletionOption.stream} onChange={handleStreamChange} />
        </Input.Wrapper>

        <OptionDescription>
          true の場合、ChatGPT のように部分的なメッセージの差分が送信されます。
          <br />
          例えば、API から大量の応答データを受信する場合、完全なレスポンスが返ってくるまで時間がかかる場合があります。
          <br />
          stream パラメーターを使用することで、API
          から取得したデータを逐次的に処理し、部分的なレスポンスを処理することができます。
          <br />
          [DONE] メッセージでストリームが終了します。
          <br />
        </OptionDescription>
      </div>
      <div>
        <Input.Wrapper size="xs" label="Stop:">
          <div className="flex gap-2">
            {stopArray.map((value, index) => (
              <div key={index}>
                <Input
                  id={`element-${index}`}
                  type="text"
                  size="xs"
                  value={value}
                  onChange={(e) => handleStopChange(e, index)}
                />
              </div>
            ))}
          </div>
        </Input.Wrapper>
        <OptionDescription>
          トークンの生成を停止するシーケンスを最大 4 つまで指定できます。
          <br />
          例えば、生成された文章が指定されたトークン（単語やフレーズなど）に到達した場合に文章の生成を停止することができます。
        </OptionDescription>
      </div>
      <div>
        <NumberInput
          label="Max Tokens:"
          id="max_tokens"
          value={chatCompletionOption.max_tokens}
          onChange={setMaxTokens}
          size="xs"
          min={0}
          max={4096}
        />
      </div>
      <div>
        <Input.Wrapper size="xs" label="Presence Penalty:">
          <Slider
            className="mb-6"
            id="presence_penalty"
            min={-2.0}
            max={2.0}
            step={0.01}
            size="sm"
            value={chatCompletionOption.presence_penalty}
            onChange={setPresencePenalty}
            marks={[
              { value: -2, label: '-2' },
              { value: 0, label: '0' },
              { value: 2, label: '2' },
            ]}
          />
        </Input.Wrapper>
        <OptionDescription>
          生成された文章がより多様性を持つように調整するために使用され、-2.0 から 2.0 の間の数値を指定します。
          値が低い場合、生成された文章が同じ単語やフレーズを繰り返すことが少なくなり、より多様な文章を生成することができます。
          値が髙い場合、生成された文章に既に含まれている単語やフレーズが強調されすぎて、文章の多様性が低下する可能性があります。
        </OptionDescription>
      </div>
      <div>
        <Input.Wrapper size="xs" label="frequency penalty:">
          <Slider
            className="mb-6"
            id="frequency_penalty"
            min={-2.0}
            max={2.0}
            step={0.01}
            size="sm"
            value={chatCompletionOption.frequency_penalty}
            onChange={setFrequencyPenalty}
            marks={[
              { value: -2, label: '-2' },
              { value: 0, label: '0' },
              { value: 2, label: '2' },
            ]}
          />
        </Input.Wrapper>
        <OptionDescription>
          生成された文書における単語の出現頻度を調整するために使用され、-2.0 から 2.0 の間の数値を指定します。
          値が低い場合、生成された文章が同じ単語やフレーズを繰り返すことが少なくなり、より多様な文章を生成することができます。
          値が髙い場合、生成された文章に既に含まれている単語やフレーズが強調されすぎて、文章の多様性が低下する可能性があります。
        </OptionDescription>
      </div>
      {/* <div>
        <label htmlFor="logit_bias">Logit Bias:</label>
        <input
          type="text"
          id="logit_bias"
          value={chatCompletionOption.logit_bias?.toString()}
          onChange={handleLogitBiasChange}
        />
      </div>
      <div>
        <label htmlFor="user">User:</label>
        <input type="text" id="user" value={chatCompletionOption.user} onChange={handleUserChange} />
      </div> */}
    </div>
  )
}
