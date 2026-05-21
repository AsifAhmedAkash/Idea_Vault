'use client'
import { Button, FieldError, Input, Label, TextArea, TextField, Select, ListBox } from '@heroui/react';
import React from 'react';

const addIdeaPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const idea = Object.fromEntries(formData.entries());

        // Convert tags string to array
        idea.tags = idea.tags.split(',').map(tag => tag.trim()).filter(Boolean);
        // Convert estimatedBudget to number
        idea.estimatedBudget = Number(idea.estimatedBudget);

        console.log(idea);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(idea)
        })
        const data = await res.json();
        console.log(data);
    }

    return (
        <div className='max-w-7xl mx-auto'>
            <h2 className='text-2xl font-bold'>Add Idea</h2>
            <form onSubmit={onSubmit} className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Idea Title */}
                    <div className="md:col-span-2">
                        <TextField name="ideaTitle" isRequired>
                            <Label>Idea Title</Label>
                            <Input placeholder="DroneAid" className="rounded-2xl" />
                            <FieldError />
                        </TextField>
                    </div>

                    {/* Short Description */}
                    <div className="md:col-span-2">
                        <TextField name="shortDescription" isRequired>
                            <Label>Short Description</Label>
                            <Input
                                placeholder="Emergency medical supply delivery via drones."
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                    {/* Detailed Description */}
                    <div className="md:col-span-2">
                        <TextField name="detailedDescription" isRequired>
                            <Label>Detailed Description</Label>
                            <TextArea
                                placeholder="Describe your idea in detail..."
                                className="rounded-3xl"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                    {/* Category */}
                    <div>
                        <Select
                            name="category"
                            isRequired
                            className="w-full"
                            placeholder="Select category"
                        >
                            <Label>Category</Label>
                            <Select.Trigger className="rounded-2xl">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="Health" textValue="Health">Health<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Education" textValue="Education">Education<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Technology" textValue="Technology">Technology<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Environment" textValue="Environment">Environment<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Finance" textValue="Finance">Finance<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Agriculture" textValue="Agriculture">Agriculture<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Social" textValue="Social">Social<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Other" textValue="Other">Other<ListBox.ItemIndicator /></ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Tags (comma separated) */}
                    <TextField name="tags">
                        <Label>Tags (comma separated)</Label>
                        <Input
                            placeholder="drones, logistics, emergency"
                            className="rounded-2xl"
                        />
                        <FieldError />
                    </TextField>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                        <TextField name="imageURL" isRequired>
                            <Label>Image URL</Label>
                            <Input
                                type="url"
                                placeholder="https://example.com/images/droneaid.jpg"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                    {/* Estimated Budget */}
                    <TextField name="estimatedBudget" type="number" isRequired>
                        <Label>Estimated Budget (USD)</Label>
                        <Input
                            type="number"
                            placeholder="500000"
                            className="rounded-2xl"
                        />
                        <FieldError />
                    </TextField>

                    {/* Target Audience */}
                    <TextField name="targetAudience" isRequired>
                        <Label>Target Audience</Label>
                        <Input
                            placeholder="Hospitals, NGOs, disaster relief agencies"
                            className="rounded-2xl"
                        />
                        <FieldError />
                    </TextField>

                    {/* Problem Statement */}
                    <div className="md:col-span-2">
                        <TextField name="problemStatement" isRequired>
                            <Label>Problem Statement</Label>
                            <TextArea
                                placeholder="What problem does your idea solve?"
                                className="rounded-3xl"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                    {/* Proposed Solution */}
                    <div className="md:col-span-2">
                        <TextField name="proposedSolution" isRequired>
                            <Label>Proposed Solution</Label>
                            <TextArea
                                placeholder="How will your idea solve the problem?"
                                className="rounded-3xl"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                </div>

                <Button
                    type="submit"
                    variant="outline"
                    className="rounded-none w-full bg-cyan-500 text-white"
                >
                    Submit Idea
                </Button>
            </form>
        </div>
    );
};

export default addIdeaPage;