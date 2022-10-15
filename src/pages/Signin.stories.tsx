import { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { rest } from 'msw'
import { expect } from '@storybook/jest'
import { Signin } from './Signin'

export default {
    title: 'Pages/Sign in',
    component: Signin,
    args: {},
    argTypes: {},
    parameters: {
        msw: {
            handlers: [
                rest.post('/session', (req, res, ctx) => {
                    return res(ctx.json({
                        message: 'Login realizado!'
                    }))
                })
            ],
        },
    }
} as Meta

export const Default: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        userEvent.type(canvas.getByPlaceholderText('Digite seu e-mail'), 'matilde@email.com')
        userEvent.type(canvas.getByPlaceholderText('*********'), '123456789')

        userEvent.click(canvas.getByRole('button'))

        await waitFor(() => {
            return expect(canvas.getByText('Login realizado!')).toBeInTheDocument()
        })
        
    }
}

