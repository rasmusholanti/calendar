import { useState } from 'react';
import { Paper, Title, Container, Text, Grid, Stack, Badge, Group, SegmentedControl, Center, ThemeIcon, Box, AppShell, ScrollArea, Button, Modal, TextInput, Select as MantineSelect, ActionIcon } from '@mantine/core';
import type { MantineTheme } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import type { DateValue } from '@mantine/dates';
import { IconTruckDelivery, IconPackageExport, IconCalendar, IconHome, IconSettings, IconUsers, IconEdit, IconTrash } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setSelectedDate,
  setViewType,
  setModalOpen,
  setEditingOrder,
  resetEditingOrder,
  addOrder,
  updateOrder,
  deleteOrder
} from '../store/calendarSlice';
import type { Order } from '../store/types';

type UserRole = 'admin' | 'seller';

export function CalendarComponent() {
  const dispatch = useAppDispatch();
  const {
    orders,
    selectedDate,
    viewType,
    isModalOpen,
    editingOrder
  } = useAppSelector(state => state.calendar);
  const [userRole] = useState<UserRole>('admin'); // This should come from your auth system
  const [editingType, setEditingType] = useState<'pickup' | 'delivery'>('delivery');

  const handleDateChange = (date: DateValue) => {
    if (!date) {
      dispatch(setSelectedDate(null));
      return;
    }
    // Convert string date to Date object if needed
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    // Convert to ISO string before dispatching
    dispatch(setSelectedDate(dateObj.toISOString()));
  };

  const handleEditOrder = (order: Order, type: 'pickup' | 'delivery') => {
    setEditingType(type);
    dispatch(setEditingOrder(order));
    dispatch(setModalOpen(true));
  };

  const handleDeleteOrder = (orderId: string) => {
    dispatch(deleteOrder(orderId));
  };

  const handleSaveOrder = (formData: Partial<Order>) => {
    if (formData.id) {
      // Ensure all required fields are present for update
      const completeOrder: Order = {
        id: formData.id,
        buyerId: formData.buyerId || '',
        sellerId: formData.sellerId || '',
        productId: formData.productId || '',
        status: formData.status || 'pending',
        address: formData.address || '',
        pickupDate: formData.pickupDate,
        deliveryDate: formData.deliveryDate
      };
      dispatch(updateOrder(completeOrder));
    } else {
      // Create new order with required fields and selected date
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        buyerId: formData.buyerId || '',
        sellerId: formData.sellerId || '',
        productId: formData.productId || '',
        status: formData.status || 'pending',
        address: formData.address || '',
        pickupDate: editingType === 'pickup' && selectedDate ? selectedDate.split('T')[0] : undefined,
        deliveryDate: editingType === 'delivery' && selectedDate ? selectedDate.split('T')[0] : undefined
      };
      dispatch(addOrder(newOrder));
    }
    
    dispatch(setModalOpen(false));
    dispatch(resetEditingOrder());
  };

  const handleFormChange = (field: keyof Order, value: string) => {
    dispatch(setEditingOrder({ [field]: value }));
  };

  const handleDateChangeForm = (value: DateValue) => {
    if (value) {
      const date = new Date(value);
      const dateStr = date.toISOString().split('T')[0];
      
      dispatch(setEditingOrder({
        ...editingOrder,
        pickupDate: editingType === 'pickup' ? dateStr : editingOrder.pickupDate,
        deliveryDate: editingType === 'delivery' ? dateStr : editingOrder.deliveryDate
      }));
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'yellow';
      case 'confirmed': return 'blue';
      case 'scheduled': return 'green';
      case 'delivered': return 'gray';
      default: return 'gray';
    }
  };

  const hasPickupOnDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return orders.some(order => {
      if (!order.pickupDate) return false;
      const pickupDate = new Date(order.pickupDate);
      return (
        pickupDate.getFullYear() === dateObj.getFullYear() &&
        pickupDate.getMonth() === dateObj.getMonth() &&
        pickupDate.getDate() === dateObj.getDate()
      );
    });
  };

  const getOrdersForPeriod = (date: Date) => {
    const startDate = new Date(date);
    const endDate = new Date(date);

        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

    return orders.filter(order => {
      const orderDate = order.pickupDate || order.deliveryDate;
      if (!orderDate) return false;
      
      const orderDateObj = new Date(orderDate);
      orderDateObj.setHours(0, 0, 0, 0);
      
      const compareStartDate = new Date(startDate);
      
      return orderDateObj >= compareStartDate && orderDateObj <= endDate;
    });
  };

  const getEventsForCurrentView = () => {
    if (!selectedDate) return { pickups: [], deliveries: [] };
    
    const dateObj = new Date(selectedDate);
    const orders = getOrdersForPeriod(dateObj);
    
    return {
      pickups: orders.filter(order => order.pickupDate),
      deliveries: orders.filter(order => order.deliveryDate)
    };
  };

  const currentViewEvents = getEventsForCurrentView();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Title order={3}>Calendar</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow component={ScrollArea}>
          <Stack gap="xs">
            <Button variant="light" leftSection={<IconHome size={20} />} fullWidth justify="flex-start">
              Dashboard
            </Button>
            <Button variant="light" leftSection={<IconCalendar size={20} />} fullWidth justify="flex-start">
              Calendar
            </Button>
            <Button variant="light" leftSection={<IconTruckDelivery size={20} />} fullWidth justify="flex-start">
              Deliveries
            </Button>
            <Button variant="light" leftSection={<IconPackageExport size={20} />} fullWidth justify="flex-start">
              Pickups
            </Button>
            <Button variant="light" leftSection={<IconUsers size={20} />} fullWidth justify="flex-start">
              Customers
            </Button>
          </Stack>
        </AppShell.Section>

        <AppShell.Section>
          <Button variant="light" leftSection={<IconSettings size={20} />} fullWidth justify="flex-start">
            Settings
          </Button>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="lg">
          <Center mb="xl">
            <Group>
              <SegmentedControl
                value={viewType}
                onChange={(value) => dispatch(setViewType(value as 'all' | 'pickups' | 'deliveries'))}
                data={[
                  { label: 'All', value: 'all' },
                  { label: 'Pick-Ups', value: 'pickups' },
                  { label: 'Deliveries', value: 'deliveries' },
                ]}
                size="md"
              />
              {(userRole === 'admin' || userRole === 'seller') && (
                <Button onClick={() => {
                  dispatch(resetEditingOrder());
                  dispatch(setModalOpen(true));
                }}>
                  Add New Event
                </Button>
              )}
            </Group>
          </Center>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper shadow="sm" p="xl" withBorder>
                <Title order={2} mb="md">Calendar</Title>
                <div style={{ 
                  padding: '1.5rem 2.0rem',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <div style={{ 
                    width: '100%',
                    maxWidth: '400px',
                    minWidth: '200px'
                  }}>
                    <DatePicker
                      value={selectedDate ? new Date(selectedDate) : null}
                      onChange={(date) => {
                        console.log('DatePicker onChange triggered with:', date);
                        if (date) {
                          console.log('Date is valid, calling handleDateChange');
                          handleDateChange(date);
                        }
                      }}
                      size="xl"
                      getDayProps={(date) => {
                        const isPickup = hasPickupOnDate(date);
                        return {
                          style: {
                            backgroundColor: isPickup ? '#e6fff2' : 'transparent',
                            color: isPickup ? '#20c997' : 'inherit',
                            fontWeight: isPickup ? 500 : 'normal',
                            border: isPickup ? '1px solid #20c997' : 'none',
                          }
                        };
                      }}
                      styles={{
                        calendarHeader: {
                          marginBottom: '1rem'
                        },
                        day: (_: MantineTheme, params: { selected: boolean; date: Date }) => {
                          const isSelected = params.selected;
                          const isPickup = hasPickupOnDate(params.date);
                          
                          if (isPickup) {
                            return {
                              fontSize: '1.1rem',
                              height: '2.5rem',
                              backgroundColor: isSelected ? '#38d996' : '#e6fff2',
                              color: isSelected ? 'white' : '#20c997',
                              fontWeight: isSelected ? 700 : 500,
                              border: isSelected ? '2px solid #20c997' : '1px solid #20c997',
                              '&:hover': {
                                backgroundColor: isSelected ? '#20c997' : '#d4f8e8',
                              },
                            };
                          }
                          
                          return {
                          fontSize: '1.1rem',
                          height: '2.5rem',
                            ...(isSelected && {
                            backgroundColor: 'var(--mantine-color-blue-6)',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'var(--mantine-color-blue-7)'
                            }
                            })
                          };
                        },
                      }}
                    />
                  </div>
                </div>
              </Paper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper shadow="sm" p="xl" withBorder h="100%">
                <Title order={2} mb="md">Schedule Details</Title>
                <div style={{ padding: '1.5rem 2.5rem' }}>
                  {selectedDate ? (
                    <Stack gap="xl">
                      {(viewType === 'all' || viewType === 'pickups') && currentViewEvents.pickups.length > 0 && (
                        <div>
                          <Title order={3} mb="md" c="green.7">
                            <Group gap={6}><ThemeIcon color="green" variant="light" size="sm"><IconPackageExport size={16} /></ThemeIcon>Pickups</Group>
                          </Title>
                          <Stack gap="md">
                            {currentViewEvents.pickups.map(order => (
                              <Paper key={order.id} p="md" withBorder radius="md" style={{ background: '#f0fff4', borderColor: '#b7f5c5' }}>
                                <Group justify="space-between" mb="xs">
                                  <Group>
                                    <ThemeIcon color="green" variant="light"><IconPackageExport size={20} /></ThemeIcon>
                                    <Text fw={500}>Order #{order.id}</Text>
                                  </Group>
                                  <Group>
                                  <Badge color={getStatusColor(order.status)}>
                                    {order.status}
                                  </Badge>
                                    {(userRole === 'admin' || userRole === 'seller') && (
                                      <Group gap="xs">
                                        <ActionIcon variant="subtle" color="blue" onClick={() => handleEditOrder(order, 'pickup')}>
                                          <IconEdit size={16} />
                                        </ActionIcon>
                                        <ActionIcon variant="subtle" color="red" onClick={() => handleDeleteOrder(order.id)}>
                                          <IconTrash size={16} />
                                        </ActionIcon>
                                      </Group>
                                    )}
                                  </Group>
                                </Group>
                                <Text size="sm" c="dimmed">Pickup Date: {order.pickupDate}</Text>
                                <Text size="sm" c="dimmed">Buyer: {order.buyerId}</Text>
                                <Text size="sm" c="dimmed">Seller: {order.sellerId}</Text>
                                <Text size="sm" c="dimmed">Product: {order.productId}</Text>
                                <Text size="sm" c="dimmed">Address: {order.address}</Text>
                              </Paper>
                            ))}
                          </Stack>
                        </div>
                      )}

                      {(viewType === 'all' || viewType === 'deliveries') && currentViewEvents.deliveries.length > 0 && (
                        <div>
                          <Title order={3} mb="md" c="blue.7">
                            <Group gap={6}><ThemeIcon color="blue" variant="light" size="sm"><IconTruckDelivery size={16} /></ThemeIcon>Deliveries</Group>
                          </Title>
                          <Stack gap="md">
                            {currentViewEvents.deliveries.map(order => (
                              <Paper key={order.id} p="md" withBorder radius="md" style={{ background: '#e7f5ff', borderColor: '#a5d8ff' }}>
                                <Group justify="space-between" mb="xs">
                                  <Group>
                                    <ThemeIcon color="blue" variant="light"><IconTruckDelivery size={20} /></ThemeIcon>
                                    <Text fw={500}>Order #{order.id}</Text>
                                  </Group>
                                  <Group>
                                  <Badge color={getStatusColor(order.status)}>
                                    {order.status}
                                  </Badge>
                                    {(userRole === 'admin' || userRole === 'seller') && (
                                      <Group gap="xs">
                                        <ActionIcon variant="subtle" color="blue" onClick={() => handleEditOrder(order, 'delivery')}>
                                          <IconEdit size={16} />
                                        </ActionIcon>
                                        <ActionIcon variant="subtle" color="red" onClick={() => handleDeleteOrder(order.id)}>
                                          <IconTrash size={16} />
                                        </ActionIcon>
                                      </Group>
                                    )}
                                  </Group>
                                </Group>
                                <Text size="sm" c="dimmed">Delivery Date: {order.deliveryDate}</Text>
                                <Text size="sm" c="dimmed">Buyer: {order.buyerId}</Text>
                                <Text size="sm" c="dimmed">Seller: {order.sellerId}</Text>
                                <Text size="sm" c="dimmed">Product: {order.productId}</Text>
                                <Text size="sm" c="dimmed">Address: {order.address}</Text>
                              </Paper>
                            ))}
                          </Stack>
                        </div>
                      )}

                      {((viewType === 'all' && currentViewEvents.pickups.length === 0 && currentViewEvents.deliveries.length === 0) ||
                        (viewType === 'pickups' && currentViewEvents.pickups.length === 0) ||
                        (viewType === 'deliveries' && currentViewEvents.deliveries.length === 0)) && (
                        <Text c="dimmed">No scheduled events for this day</Text>
                      )}
                    </Stack>
                  ) : (
                    <Text c="dimmed">Select a date to see schedule details</Text>
                  )}
                </div>
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>

      <Modal
        opened={isModalOpen}
        onClose={() => {
          dispatch(setModalOpen(false));
          dispatch(resetEditingOrder());
          setEditingType('delivery');
        }}
        title={editingOrder.id ? "Edit Event" : "Add New Event"}
        size="lg"
      >
        <Stack>
          <MantineSelect
            label="Event Type"
            placeholder="Select event type"
            data={[
              { value: 'pickup', label: 'Pickup' },
              { value: 'delivery', label: 'Delivery' }
            ]}
            value={editingType}
            onChange={(value) => {
              setEditingType(value as 'pickup' | 'delivery');
              dispatch(setEditingOrder({
                ...editingOrder,
                pickupDate: editingOrder.pickupDate,
                deliveryDate: editingOrder.deliveryDate
              }));
            }}
          />
          {editingOrder.id && (
            <DatePicker
              value={editingOrder.pickupDate || editingOrder.deliveryDate}
              onChange={handleDateChangeForm}
            />
          )}
          <TextInput
            label="Buyer ID"
            placeholder="Enter buyer ID"
            value={editingOrder.buyerId}
            onChange={(e) => handleFormChange('buyerId', e.target.value)}
          />
          <TextInput
            label="Seller ID"
            placeholder="Enter seller ID"
            value={editingOrder.sellerId}
            onChange={(e) => handleFormChange('sellerId', e.target.value)}
          />
          <TextInput
            label="Product ID"
            placeholder="Enter product ID"
            value={editingOrder.productId}
            onChange={(e) => handleFormChange('productId', e.target.value)}
          />
          <TextInput
            label="Address"
            placeholder="Enter address"
            value={editingOrder.address}
            onChange={(e) => handleFormChange('address', e.target.value)}
          />
          <MantineSelect
            label="Status"
            placeholder="Select status"
            data={[
              { value: 'pending', label: 'Pending' },
              { value: 'confirmed', label: 'Confirmed' },
              { value: 'scheduled', label: 'Scheduled' },
              { value: 'delivered', label: 'Delivered' }
            ]}
            value={editingOrder.status}
            onChange={(value) => handleFormChange('status', value as Order['status'])}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={() => {
              dispatch(setModalOpen(false));
              dispatch(resetEditingOrder());
            }}>
              Cancel
            </Button>
            <Button onClick={() => handleSaveOrder(editingOrder)}>
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>
    </AppShell>
  );
} 