"use client";

import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/dist/server/api-utils";

export function DeleteAlert({ idea }) {
    const {
        _id,
        ideaTitle,
    } = idea;

    const handleDelete = async () => {
        const res = fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${_id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            }
        })

        const data = await res.json;
        console.log(data);
        redirect('/ideas');
    }



    return (
        <AlertDialog>
            <Button className="text-white-500 rounded-xl" variant="danger">Delete</Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>{ideaTitle}</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} slot="close" variant="danger">
                                Delete
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}