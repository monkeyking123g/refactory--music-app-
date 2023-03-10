import React, { FC } from 'react';
//import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
// `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`
//import chakraTheme from '@chakra-ui/theme'


//const { Button  } = chakraTheme.components

interface MyButtonProps {
    title?: string;
  }
  

// const theme = extendBaseTheme({
//   components: {
//     Button,
//   },
// })

const MyButton: FC<MyButtonProps> = ({ title }) => {
    // const configButton = {
    //     ...otherProps
    // }
  return (
    
    <button >{title}</button>
    
  )
}

export default MyButton;