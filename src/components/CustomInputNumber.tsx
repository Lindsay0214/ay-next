import React, { forwardRef, useState, useEffect, useRef } from 'react'
import {
  Input,
  InputGroup,
  Button,
  HStack,
  InputProps,
  Text,
  Icon,
} from '@chakra-ui/react'
import { GrAdd, GrSubtract } from 'react-icons/gr'

type InputEventType = React.ChangeEvent<HTMLInputElement>

type CustomInputNumberProps = {
  min: number
  max: number
  step: number
  name: string
  value: number
  onChange?: (e: InputEventType) => void
  onBlur?: (e: InputEventType) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  disabled?: boolean
} & Omit<InputProps, 'defaultValue'>

const CustomInputNumber = forwardRef<HTMLInputElement, CustomInputNumberProps>(
  function CustomInputNumber(
    { min, max, step, name, value, onChange, onBlur, onKeyDown, disabled, ...props },
    ref
  ) {
    const [inputValue, setInputValue] = useState(value)
    const incrementRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const decrementRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
      setInputValue(value)
    }, [value])

    const handleChange = (e: InputEventType) => {
      const newValue = +e.target.value
      if (newValue >= min && newValue <= max) {
        setInputValue(newValue)
        onChange && onChange(e)
      }
    }

    const handleIncrement = () => {
      if (inputValue < max) {
        const newValue = inputValue + step
        setInputValue(newValue)
        onChange &&
          onChange({
            target: { name, value: newValue },
          } as InputEventType)
      }
    }

    const handleDecrement = () => {
      if (inputValue > min) {
        const newValue = inputValue - step
        setInputValue(newValue)
        onChange &&
          onChange({
            target: { name, value: newValue },
          } as InputEventType)
      }
    }

    const handleMouseDown = (
      action: () => void,
      ref: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
    ) => {
      action()
      ref.current = setInterval(action, 100)
    }

    const handleMouseUp = (
      ref: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
    ) => {
      if (ref.current) {
        clearInterval(ref.current as unknown as number)
        ref.current = null
      }
    }

    const handleMouseLeave = (
      ref: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
    ) => {
      if (ref.current) {
        clearInterval(ref.current as unknown as number)
        ref.current = null
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        handleIncrement()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        handleDecrement()
      }
      onKeyDown && onKeyDown(e)
    }

    return (
      <InputGroup>
        <HStack>
          <Button
            onMouseDown={() => handleMouseDown(handleDecrement, decrementRef)}
            onMouseUp={() => handleMouseUp(decrementRef)}
            onMouseLeave={() => handleMouseLeave(decrementRef)}
            disabled={disabled || inputValue <= min}
            size="sm"
            width="48px"
            height="48px"
            fontSize="16px"
            backgroundColor="transparent"
            borderWidth={1}
            borderColor="blue.200"
            cursor={disabled || inputValue <= min ? 'not-allowed' : 'pointer'}
            _disabled={{ color: 'gray.50', borderColor: 'gray.200' }}
            _hover={{ backgroundColor: 'blue.50' }}
          >
            <Text color="blue.200" fontSize="30px" lineHeight="50px">
              <Icon as={GrSubtract} boxSize={5} />
            </Text>
          </Button>
          <Input
            ref={ref}
            type="number"
            name={name}
            value={inputValue}
            min={min}
            max={max}
            step={step}
            onChange={handleChange}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            textAlign="center"
            width="48px"
            height="48px"
            fontSize="16px"
            margin="8px"
            {...props}
          />
          <Button
            onMouseDown={() => handleMouseDown(handleIncrement, incrementRef)}
            onMouseUp={() => handleMouseUp(incrementRef)}
            onMouseLeave={() => handleMouseLeave(incrementRef)}
            disabled={disabled || inputValue >= max}
            size="sm"
            width="48px"
            height="48px"
            fontSize="16px"
            cursor={disabled || inputValue >= max ? 'not-allowed' : 'pointer'}
            backgroundColor="transparent"
            borderWidth={1}
            borderColor="blue.200"
            _disabled={{ color: 'gray.50', borderColor: 'gray.200' }}
            _hover={{ backgroundColor: 'blue.50' }}
          >
            <Text color="blue.200" fontSize="30px" lineHeight="50px">
              <Icon as={GrAdd} boxSize={5} />
            </Text>
          </Button>
        </HStack>
      </InputGroup>
    )
  }
)

export default CustomInputNumber
