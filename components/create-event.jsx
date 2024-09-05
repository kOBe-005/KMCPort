"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import EventForm from "./event-form";

export default function CreateEventDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const create = searchParams.get("create");
    if (create === "true") {
      setIsOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    // Expose a global function to open the drawer
    window.openCreateEventDrawer = () => setIsOpen(true);

    return () => {
      delete window.openCreateEventDrawer;
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (searchParams.get("create") === "true") {
      router.replace(window.location.pathname);
    }
  };

  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Event</DrawerTitle>
        </DrawerHeader>
        <EventForm
          onSubmit={(data) => {
            // Handle form submission
            console.log(data);
            handleClose();
          }}
        />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
