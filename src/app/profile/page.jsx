"use client";
import { useState, useEffect } from "react";
import { Button, Card, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({
        name: "",
        image: "",
    });

    useEffect(() => {
        const fetchSession = async () => {
            const session = await authClient.getSession();
            const user = session?.data?.user;
            if (user) {
                setForm({
                    name: user.name ?? "",
                    image: user.image ?? "",
                });
            }
        };
        fetchSession();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const { error } = await authClient.updateUser({
            name: form.name,
            image: form.image,
        });

        setLoading(false);

        if (error) {
            setError(error.message ?? "Something went wrong.");
        } else {
            setSuccess("Profile updated successfully!");
            router.refresh();
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>
            <Card className="border p-6 max-w-md">
                <Form onSubmit={onSubmit} className="flex flex-col gap-4 w-96">
                    <TextField name="name" isRequired>
                        <Label>Name</Label>
                        <Input
                            placeholder="Your Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <FieldError />
                    </TextField>

                    <TextField name="image" type="url">
                        <Label>Profile Picture URL</Label>
                        <Input
                            placeholder="https://yourimg.jpg"
                            value={form.image}
                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                        />
                        <FieldError />
                    </TextField>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}

                    <Button type="submit" isDisabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </Form>

                {form.image && (
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <p className="text-sm text-gray-500">Profile picture preview</p>
                        <img
                            src={form.image}
                            alt="Profile preview"
                            className="w-20 h-20 rounded-full object-cover border"
                            onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ProfilePage;