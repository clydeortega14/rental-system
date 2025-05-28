import React from "react";
import LessorLayout from "@/Layouts/LessorLayout";
import { Card, CardContent } from "@/Components/Lessor/ui/card";
import { Button } from "@/Components/Lessor/ui/button";
import { Input } from "@/Components/Lessor/ui/input";
import { Textarea } from "@/Components/Lessor/ui/textarea";

export default function LessorDashboard() {
  const lessorName = "John Lessor";

  return (
    <LessorLayout lessorName={lessorName}>
      {/* The rest remains unchanged */}
      <section id="listings" className="mb-12">
        ...
      </section>

      <section id="inquiries" className="mb-12">
        ...
      </section>

      <section id="profile">
        ...
      </section>
    </LessorLayout>
  );
}
