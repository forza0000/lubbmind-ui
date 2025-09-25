"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const languages = [
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(
    languages.find(lang => lang.code === i18n.language) || languages[0]
  );

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage) {
      const language = languages.find(lang => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
        handleLanguageChange(language, false);
      }
    }
  }, []);

  const handleLanguageChange = (language: typeof languages[0], saveToStorage = true) => {
    setCurrentLanguage(language);
    
    // Change i18n language
    i18n.changeLanguage(language.code);
    
    // Update document direction for RTL languages
    if (language.code === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = language.code;
    }

    // Save to localStorage
    if (saveToStorage) {
      localStorage.setItem('i18nextLng', language.code);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Globe className="h-4 w-4 text-lubbmind-600" />
          <span className="hidden sm:inline font-medium">{currentLanguage.name}</span>
          <span className="sm:hidden text-lg">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={`cursor-pointer flex items-center gap-3 p-3 transition-colors ${
              currentLanguage.code === language.code 
                ? "bg-lubbmind-50 dark:bg-lubbmind-900/20 text-lubbmind-700 dark:text-lubbmind-300" 
                : "hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="font-medium">{language.name}</span>
            {currentLanguage.code === language.code && (
              <span className="ml-auto text-lubbmind-600">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}