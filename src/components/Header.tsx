import { AppShell, Container, Group, Text, ThemeIcon } from '@mantine/core';
import { IconCalendarEvent } from '@tabler/icons-react';

export function Header() {
  return (
    <AppShell.Header px="md">
      <Container size="lg" h="100%">
        <Group justify="space-between" h="100%">
          <Group>
            <ThemeIcon size="lg" radius="md" variant="light">
              <IconCalendarEvent size={24} />
            </ThemeIcon>
            <Text size="xl" fw={700}>Delivery Calendar</Text>
          </Group>
        </Group>
      </Container>
    </AppShell.Header>
  );
} 