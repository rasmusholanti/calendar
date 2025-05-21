import { AppShell, Container, Group, Text, Anchor } from '@mantine/core';

export function Footer() {
  return (
    <AppShell.Footer py="md">
      <Container size="lg">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            © {new Date().getFullYear()} Delivery Calendar. All rights reserved.
          </Text>
          <Group gap="xl">
            <Anchor href="#" size="sm">Privacy Policy</Anchor>
            <Anchor href="#" size="sm">Terms of Service</Anchor>
            <Anchor href="#" size="sm">Contact Us</Anchor>
          </Group>
        </Group>
      </Container>
    </AppShell.Footer>
  );
} 