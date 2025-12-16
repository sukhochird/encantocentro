"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  User,
} from "lucide-react";

export function ContactSection() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [formData, setFormData] = useState({
    serviceType: [] as string[],
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("loading");
    setErrorMessage("");

    try {
      // API base URL - adjust this to match your Django server
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      // Prepare data for POST request
      const requestData = {
        service_type: formData.serviceType.join(","),
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        message: formData.message || "",
      };

      const apiUrl = `${API_BASE_URL}/api/appointments/appointments/`;

      console.log("Sending POST request to:", apiUrl);
      console.log("Request data:", requestData);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || 
          errorData.message || 
          `Сервэрийн алдаа: ${response.status}`
        );
      }

      const result = await response.json();
      console.log("API Response:", result);

      setSubmitState("success");

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          serviceType: [],
          phone: "",
          date: "",
          time: "",
          message: "",
        });
        setSubmitState("idle");
      }, 3000);
    } catch (error) {
      console.error("API request failed:", error);

      const errorMsg =
        error instanceof Error
          ? error.message
          : "Тодорхойгүй алдаа гарлаа";
      setErrorMessage(errorMsg);
      setSubmitState("error");

      // Reset error state after 5 seconds
      setTimeout(() => {
        setSubmitState("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    // Special handling for phone number - only allow numbers and limit to 8 digits
    if (name === "phone") {
      const numbersOnly = value.replace(/[^0-9]/g, "");
      const limitedNumbers = numbersOnly.slice(0, 8);
      setFormData({
        ...formData,
        [name]: limitedNumbers,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleServiceTypeChange = (
    service: string,
    checked: boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: checked
        ? [...prev.serviceType, service]
        : prev.serviceType.filter((s) => s !== service),
    }));
  };

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

  const isFormValid =
    formData.serviceType.length > 0 &&
    formData.phone &&
    formData.phone.length === 8 &&
    /^[0-9]{8}$/.test(formData.phone) &&
    formData.date &&
    formData.time;

  // Sales team data
  const salesTeam = [
    {
      name: "А.Хэтболд",
      position: "Ерөнхий менежер",
      specialization: "Үйлчилгээ түрээсийн талбай",
      phone: "99191522",
      email: "khetbold@orgil.mn",
      avatar:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/sales/hetbold.jpg",
    },
    {
      name: "Т.Номин-Эрдэнэ",
      position: "Борлуулалтын менежер",
      specialization: "Байрны борлуулалт",
      phone: "94058858",
      email: "nominerdene@orgil.mn",
      avatar:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/sales/nomin.jpg",
    },
    {
      name: "Роломжав",
      position: "Борлуулалтын менежер",
      specialization: "Байрны борлуулалт",
      phone: "94018858",
      email: "encantotown1@gmail.com",
      avatar:
        "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/sales/rolomjav.jpg",
    },
  ];

  return (
    <section id="уулзалт" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-foreground mb-6">
            Уулзалтын цаг товлох
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Манай мэргэжилтнүүдтэй уулзаж, таны хэрэгцээнд
            тохирсон шийдлийг олоорой
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Appointment Form */}
          <div className="bg-card border border-border p-4 sm:p-6 lg:p-10 rounded-lg">
            <h3 className="text-2xl text-card-foreground mb-6">
              Уулзалт товлох
            </h3>

            {/* Success Message */}
            {submitState === "success" && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3">
                <CheckCircle
                  className="text-green-600 dark:text-green-400 flex-shrink-0"
                  size={20}
                />
                <div>
                  <p className="text-green-800 dark:text-green-200">
                    Уулзалтын хүсэлт амжилттай илгээгдлээ!
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    Бид тантай удахгүй холбогдох болно.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitState === "error" && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3">
                <AlertCircle
                  className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
                  size={20}
                />
                <div>
                  <p className="text-red-800 dark:text-red-200">
                    Уулзалтын хүсэлт илгээхэд алдаа гарлаа
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-300">
                    {errorMessage ||
                      "Дахин оролдоно уу эсвэл утсаар холбогдоно уу."}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Type Selection */}
              <div>
                <label className="block text-foreground mb-3">
                  Үйлчилгээний төрөл *
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="apartment"
                      checked={formData.serviceType.includes(
                        "apartment",
                      )}
                      onCheckedChange={(checked) =>
                        handleServiceTypeChange(
                          "apartment",
                          checked as boolean,
                        )
                      }
                      disabled={submitState === "loading"}
                    />
                    <label
                      htmlFor="apartment"
                      className="text-foreground cursor-pointer"
                    >
                      Байрны захиалга
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="commercial"
                      checked={formData.serviceType.includes(
                        "commercial",
                      )}
                      onCheckedChange={(checked) =>
                        handleServiceTypeChange(
                          "commercial",
                          checked as boolean,
                        )
                      }
                      disabled={submitState === "loading"}
                    />
                    <label
                      htmlFor="commercial"
                      className="text-foreground cursor-pointer"
                    >
                      Худалдааны төв түрээс
                    </label>
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-foreground mb-2">
                  Утасны дугаар *
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="99111234"
                  pattern="[0-9]{8}"
                  maxLength={8}
                  disabled={submitState === "loading"}
                />
                {formData.phone &&
                  formData.phone.length > 0 &&
                  formData.phone.length !== 8 && (
                    <p className="text-destructive text-sm mt-1">
                      Утасны дугаар заавал 8 оронтой тоо байх
                      ёстой
                    </p>
                  )}
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-foreground mb-2">
                  Огноо *
                </label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  required
                  disabled={submitState === "loading"}
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-foreground mb-3">
                  Цаг *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          time,
                        }))
                      }
                      disabled={submitState === "loading"}
                      className={`p-2 rounded text-xs sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        formData.time === time
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-foreground mb-2">
                  Нэмэлт мэдээлэл
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Таны хэрэгцээ, асуулт эсвэл тусгай хүсэлтийг энд бичнэ үү..."
                  disabled={submitState === "loading"}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  !isFormValid || submitState === "loading"
                }
              >
                {submitState === "loading" ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2
                      className="animate-spin"
                      size={18}
                    />
                    <span>Илгээж байна...</span>
                  </div>
                ) : (
                  "Уулзалт товлох"
                )}
              </Button>
            </form>
          </div>

          {/* Sales Team & Contact Info */}
          <div className="space-y-8">
            {/* Sales Team */}
            <div className="bg-card border border-border p-4 sm:p-6 lg:p-8 rounded-lg">
              <h3 className="text-2xl text-card-foreground mb-6">
                Борлуулалтын баг
              </h3>
              <div className="space-y-6">
                {salesTeam.map((member, index) => (
                  <div
                    key={index}
                    className="border-b border-border last:border-b-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-start space-x-4">
                      <ImageWithFallback
                        src={member.avatar}
                        alt={member.name}
                        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg text-card-foreground mb-1">
                          {member.name}
                        </h4>
                        <p className="text-muted-foreground text-sm mb-1">
                          {member.position}
                        </p>
                        <p className="text-muted-foreground text-sm mb-3">
                          {member.specialization}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Phone
                              size={14}
                              className="text-muted-foreground flex-shrink-0"
                            />
                            <span className="text-card-foreground text-sm break-all">
                              {member.phone}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail
                              size={14}
                              className="text-muted-foreground flex-shrink-0"
                            />
                            <span className="text-card-foreground text-sm break-all">
                              {member.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card border border-border p-4 sm:p-6 lg:p-8 rounded-lg">
              <h3 className="text-2xl text-card-foreground mb-6">
                Борлуулалтын алба
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin
                    size={18}
                    className="text-muted-foreground mt-1"
                  />
                  <div>
                    <p className="text-card-foreground text-sm sm:text-base">
                      Улаанбаатар хот, Баянзүрх дүүрэг,
                      <br />
                      26-р хороо Их Монгол Улсын гудамж
                      <br />
                      Энканто оффис 4 давхар
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock
                    size={18}
                    className="text-muted-foreground"
                  />
                  <span className="text-card-foreground text-sm sm:text-base">
                    Даваа - Баасан: 09:00 - 18:00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}