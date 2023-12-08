import { AppShell, MantineProvider, createTheme } from "@mantine/core";

export default function Providers({ children }: { children: React.ReactNode }) {
    const theme = createTheme({});

    return (
        <MantineProvider defaultColorScheme="dark" forceColorScheme="dark">
            <AppShell>{children}</AppShell>
        </MantineProvider>
    );
}
