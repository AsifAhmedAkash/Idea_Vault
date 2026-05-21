// import React from 'react';
"use client";
import { Button, Card, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";
import { redirect } from "next/navigation";

const SignUpPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())


        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
        })

        console.log("user ", data, error);

        if (data) {
            redirect('/')
        }

        if (error) {
            //toast
            alert("error");
        }
    }

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    }

    return (
        <div className="max-w-7xl mx-auto">
            <Card className="border">
                <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4" >
                    <TextField
                        isRequired
                        name="name"
                        type="text"

                    >
                        <Label>Name</Label>
                        <Input placeholder="Your Name" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        name="image"
                        type="url"

                    >
                        <Label>Image</Label>
                        <Input placeholder="https//www.yourimg.jpg" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex gap-2 justify-center">
                        <Button type="submit">

                            Create account
                        </Button>

                    </div>
                </Form>
                <div className="flex justify-center items-center">
                    <Separator>
                        <div className="whitespace-nowrap">
                            or sign up with
                        </div>
                    </Separator>
                </div>
                <div>
                    <Button className="w-full rounded-2xl" onClick={handleGoogleSignIn}>Google</Button>
                </div>
            </Card>
        </div>
    );
};

export default SignUpPage;