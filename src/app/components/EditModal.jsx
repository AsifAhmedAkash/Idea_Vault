"use client";


import { Button, Input, Label, Modal, Surface, TextField, Select, ListBox, FieldError, TextArea } from "@heroui/react";

export function EditModal({ destination }) {
    const {
        _id,
        destinationName,
        country,
        category,
        price,
        duration,
        departureDate,
        imageUrl,
        description
    } = destination;

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("submitted");
        const formData = new FormData(e.currentTarget)
        const destination = Object.fromEntries(formData.entries());

        console.log(destination);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}destination/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(destination)
        })
        const data = await res.json();
        console.log(data);
    }
    return (
        <Modal>
            <Button variant="outline" className="rounded-xl mb-3">
                Edit
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />

                        <Modal.Body className="p-1">
                            <Surface variant="default">
                                <form onSubmit={onSubmit}
                                    className="p-10 space-y-8"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Destination Name */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={destinationName} name="destinationName" isRequired>
                                                <Label>Destination Name</Label>
                                                <Input placeholder="Bali Paradise" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Country */}
                                        <TextField defaultValue={country} name="country" isRequired>
                                            <Label>Country</Label>
                                            <Input placeholder="Indonesia" className="rounded-2xl" />
                                            <FieldError />
                                        </TextField>

                                        {/* Category - Updated Select Component */}
                                        <div>
                                            <Select
                                                name="category"
                                                isRequired
                                                className="w-full"
                                                placeholder="Select category"
                                                defaultValue={category}
                                            >
                                                <Label>Category</Label>
                                                <Select.Trigger className="rounded-2xl">
                                                    <Select.Value />
                                                    <Select.Indicator />
                                                </Select.Trigger>
                                                <Select.Popover>
                                                    <ListBox>
                                                        <ListBox.Item id="Beach" textValue="Beach">
                                                            Beach
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>

                                                        <ListBox.Item id="Mountain" textValue="Mountain">
                                                            Mountain
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>

                                                        <ListBox.Item id="City" textValue="City">
                                                            City
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>

                                                        <ListBox.Item id="Adventure" textValue="Adventure">
                                                            Adventure
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>

                                                        <ListBox.Item id="Cultural" textValue="Cultural">
                                                            Cultural
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>

                                                        <ListBox.Item id="Luxury" textValue="Luxury">
                                                            Luxury
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>

                                                        <ListBox.Item id="Temple" textValue="Temple">
                                                            Temple
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>

                                                        <ListBox.Item id="HistoricalSite" textValue="Historical Site">
                                                            Historical Site
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>

                                                        <ListBox.Item id="Palace" textValue="Palace">
                                                            Palace
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>

                                                        <ListBox.Item id="ArchaeologicalSite" textValue="Archaeological Site">
                                                            Archaeological Site
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>

                                                        <ListBox.Item id="Amphitheatre" textValue="Amphitheatre">
                                                            Amphitheatre
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>

                                                        <ListBox.Item id="Citadel" textValue="Citadel">
                                                            Citadel
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                    </ListBox>

                                                </Select.Popover>
                                            </Select>
                                        </div>

                                        {/* Price */}
                                        <TextField defaultValue={price} name="price" type="number" isRequired>
                                            <Label>Price (USD)</Label>
                                            <Input
                                                type="number"
                                                placeholder="1299"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Duration */}
                                        <TextField defaultValue={duration} name="duration" isRequired>
                                            <Label>Duration</Label>
                                            <Input
                                                placeholder="7 Days / 6 Nights"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Departure Date */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={departureDate} name="departureDate" type="date" isRequired>
                                                <Label>Departure Date</Label>
                                                <Input type="date" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Image URL - Removed preview */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={imageUrl} name="imageUrl" isRequired>
                                                <Label>Image URL</Label>
                                                <Input
                                                    type="url"
                                                    placeholder="https://example.com/bali-paradise.jpg"
                                                    className="rounded-2xl"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Description */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={description} name="description" isRequired>
                                                <Label>Description</Label>
                                                <TextArea
                                                    placeholder="Describe the travel experience..."
                                                    className="rounded-3xl"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                    </div>

                                    {/* Buttons */}

                                    <Button type="submit" slot="close">Submit</Button>
                                </form>
                            </Surface>

                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}