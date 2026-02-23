"use client";

import { useState } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { CustomerWithFavoriteInterest } from "@/types/customer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  customers: CustomerWithFavoriteInterest[];
  value: CustomerWithFavoriteInterest | null;
  onChange: (customer: CustomerWithFavoriteInterest) => void;
}

export function CustomerSelect({ customers, value, onChange }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateCustomer() {
    if (!newName || !newEmail) return;

    try {
      setLoading(true);

      const res = await axios.post("/api/customers", {
        name: newName,
        email: newEmail,
      });
      const created = res.data;
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      onChange(created);
      setCreateOpen(false);
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Select existing customer */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {value ? value.name : "Select customer"}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Search customer..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              {customers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  value={customer.name}
                  onSelect={() => {
                    onChange(customer);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      value?.id === customer.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {customer.name} ({customer.email ?? "—"})
                </CommandItem>
              ))}

              {/* Create new customer option */}
              {search && (
                <CommandItem
                  onSelect={() => {
                    setNewName(search);
                    setNewEmail("");
                    setCreateOpen(true);
                  }}
                  className="text-primary"
                >
                  <Plus /> Create {`"${search}"`}
                </CommandItem>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* Create customer */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Customer</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Customer name"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="customer@email.com"
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleCreateCustomer} disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
