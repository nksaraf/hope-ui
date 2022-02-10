import "./playground.css";

import { createEffect, createSignal, onMount, Show } from "solid-js";
import { render } from "solid-js/web";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HopeProvider,
  HStack,
  Icon,
  IconExclamationCircle,
  Input,
  Stack,
} from ".";

export function App() {
  const [checked, setChecked] = createSignal(false);
  const [indeterminate, setIndeterminate] = createSignal(false);
  const [required, setRequired] = createSignal(false);
  const [disabled, setDisabled] = createSignal(false);
  const [invalid, setInvalid] = createSignal(false);
  const [readOnly, setReadOnly] = createSignal(false);
  const [showDiv, setShowDiv] = createSignal(false);

  const [checkedItems, setCheckedItems] = createSignal([false, false]);

  const allChecked = () => checkedItems().every(Boolean);
  const isIndeterminate = () => checkedItems().some(Boolean) && !allChecked();

  const focusHandler = (e: FocusEvent) => {
    console.log("focused", e);
  };

  const blurHandler = (e: FocusEvent) => {
    console.log("blured", e);
  };

  let myDiv: any;
  let helperText: any;
  let errorMessage: any;

  const logRefs = () => {
    console.log("my-div", myDiv);

    // console.log("helper-text", helperText);
    // console.log("error-message", errorMessage);
  };

  return (
    <Box p="$4">
      <HStack spacing="$4" wrap="wrap">
        <Button onClick={() => setChecked(prev => !prev)}>checked : {checked().toString()}</Button>
        <Button onClick={() => setIndeterminate(prev => !prev)}>
          indeterminate : {indeterminate().toString()}
        </Button>
        <Button onClick={() => setRequired(prev => !prev)}>
          required : {required().toString()}
        </Button>
        <Button onClick={() => setDisabled(prev => !prev)}>
          disabled : {disabled().toString()}
        </Button>
        <Button onClick={() => setInvalid(prev => !prev)}>invalid : {invalid().toString()}</Button>
        <Button onClick={() => setReadOnly(prev => !prev)}>
          readOnly : {readOnly().toString()}
        </Button>
        <Button onClick={() => setShowDiv(prev => !prev)}>Show div : {showDiv().toString()}</Button>
        <Button onClick={logRefs}>Log refs</Button>
        <Button loading>Loading</Button>
      </HStack>

      <FormControl
        maxW="max-content"
        id="email"
        required={required()}
        invalid={invalid()}
        disabled={disabled()}
        readOnly={readOnly()}
      >
        <FormLabel
          for="email"
          _focus={{
            color: "tomato",
          }}
        >
          Email address
        </FormLabel>
        <Input type="email" placeholder="Placeholder" onFocus={focusHandler} onBlur={blurHandler} />
        <FormHelperText ref={helperText}>We'll never share your email.</FormHelperText>
        <HStack ref={errorMessage} as={FormErrorMessage} color="$danger9" spacing="$1">
          <IconExclamationCircle />
          <span>An error occured</span>
        </HStack>
      </FormControl>

      <Checkbox
        checked={checked()}
        indeterminate={indeterminate()}
        required={required()}
        invalid={invalid()}
        disabled={disabled()}
        readOnly={readOnly()}
        onChange={e => setChecked(e.target.checked)}
        onFocus={() => setShowDiv(prev => !prev)}
        onBlur={() => setShowDiv(prev => !prev)}
      >
        Hello
      </Checkbox>
      <Checkbox
        checked={allChecked()}
        indeterminate={isIndeterminate()}
        onChange={e => setCheckedItems([e.target.checked, e.target.checked])}
      >
        Parent Checkbox
      </Checkbox>
      <Stack pl="$6" mt="$1" rowGap="$1">
        <Checkbox
          checked={checkedItems()[0]}
          onChange={e => setCheckedItems([e.target.checked, checkedItems()[1]])}
        >
          Child Checkbox 1
        </Checkbox>
        <Checkbox
          checked={checkedItems()[1]}
          onChange={e => setCheckedItems([checkedItems()[0], e.target.checked])}
        >
          Child Checkbox 2
        </Checkbox>
      </Stack>
    </Box>
  );
}

render(
  () => (
    <HopeProvider>
      <App />
    </HopeProvider>
  ),
  document.getElementById("root") as HTMLElement
);
