"use client";

import {
    Button,
    Card,
    Code,
    CopyButton,
    Modal,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IconHeart } from "@tabler/icons-react";
import { useState } from "react";

export default function Home() {
    const [convertedString, setConvertedString] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");
    const [modalOpened, setModalOpened] = useState(false);

    function convertConnectionString(originalConnectionString: string) {
        const urlParts = new URL(
            originalConnectionString.replace(/^mysql:\/\//, "http://")
        );

        const server = urlParts.hostname;
        const port = urlParts.port || "3306";
        const database = urlParts.pathname.substring(1);
        const user = urlParts.username;
        const password = urlParts.password || ""; // Empty string if no password
        const charset = urlParts.searchParams.get("charset") || "utf8mb4";

        let convertedString: string | null = null;

        if (password) {
            convertedString = `set mysql_connection_string "server=${server};port=${port};database=${database};user=${user};password=${password};charset=${charset};"`;
        } else {
            convertedString = `set mysql_connection_string "server=${server};port=${port};database=${database};user=${user};charset=${charset};"`;
        }

        return convertedString;
    }

    const form = useForm({
        initialValues: {
            string: "",
        },
    });
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-3">
            <form
                onSubmit={form.onSubmit((values) => {
                    const convertedString = convertConnectionString(
                        values.string
                    );
                    setConvertedString(convertedString);
                    setModalOpened(true);
                })}
                className="w-1/2"
            >
                <Card shadow="sm" padding="md">
                    <h1 className="text-2xl mb-2 font-bold">
                        MySQL String Converter
                    </h1>
                    <div className="flex flex-col gap-3">
                        <TextInput
                            label="MySQL String"
                            {...form.getInputProps("string")}
                            placeholder="mysql://..."
                            className="w-full"
                            autoFocus
                        />
                        <Button type="submit" variant="light">
                            Convert Now
                        </Button>
                    </div>
                    <span className="mt-3 text-xs opacity-50 flex flex-row gap-1">
                        Utility created with{" "}
                        <IconHeart className="text-rose-500" size={16} />
                        by Whitigol
                    </span>
                </Card>
            </form>

            <Modal
                opened={modalOpened}
                title={<h1 className="text-lg">Converted String</h1>}
                centered
                className="w-1/2"
                onClose={() => {
                    form.reset();
                    setModalOpened(false);
                    setInputValue("");
                }}
            >
                <TextInput disabled value={convertedString} />
                <CopyButton value={convertedString}>
                    {({ copied, copy }) => (
                        <Button color={copied ? "teal" : "blue"} onClick={copy}>
                            {copied ? "Copied!" : "Copy"}
                        </Button>
                    )}
                </CopyButton>
            </Modal>
        </div>
    );
}
