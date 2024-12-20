import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import IndexChangePassword from "@/pages/application/change-password"
import { Label } from "@radix-ui/react-dropdown-menu"
import XteriumLogo from "data-base64:/assets/app-logo/xterium-logo.png"
import {
  ChevronUp,
  Coins,
  DollarSign,
  MessageCircle,
  Network,
  Settings,
  Wallet
} from "lucide-react"
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import i18n from "../i18n"
import { Button } from "./ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer"

const ApplicationSidebar = ({ onSetCurrentPage, onSetIsLogout }) => {
  const { t } = useTranslation()

  const applicationItems = [
    {
      title: t("Balance"),
      url: "#",
      icon: DollarSign
    },
    {
      title: t("Tokens"),
      url: "#",
      icon: Coins
    },
    {
      title: t("Network Status"),
      url: "#",
      icon: Network
    },
    {
      title: t("Support"),
      url: "#",
      icon: MessageCircle
    }
  ]

  const setupItems = [
    {
      title: t("Wallets"),
      url: "#",
      icon: Wallet
    }
  ]

  const [isChangePasswordDrawerOpen, setIsChangePasswordDrawerOpen] = useState(false) // State for drawer
  const [isChangeLanguageDrawerOpen, setIsChangeLanguageDrawerOpen] = useState(false) // State for drawer
  const { setTheme } = useTheme()
  const [activeItem, setActiveItem] = useState<string>("")
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [selectedLangToChange, setSelectedLangToChange] = useState("")

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    switch (lng) {
      case "en":
        setSelectedLanguage("English")
        break
      case "ja":
        setSelectedLanguage("Japanese")
        break
      case "ko":
        setSelectedLanguage("Korean")
        break
      case "zh":
        setSelectedLanguage("Chinese")
        break
      default:
        setSelectedLanguage("English")
    }
  }

  useEffect(() => {
    const storedLang = localStorage.getItem("language")

    if (storedLang) {
      changeLanguage(storedLang)
    }
  }, [])

  const toggleDrawer = () => {
    setIsChangePasswordDrawerOpen(true)
  }

  const toggleChangeLanguageDrawer = () => {
    setIsChangeLanguageDrawerOpen(true)
  }

  const handleSignOut = () => {
    onSetIsLogout()
  }

  const callbackUpdates = () => {
    setIsChangePasswordDrawerOpen(false)
    setIsChangeLanguageDrawerOpen(false)
  }

  const expandView = () => {
    const extensionId = chrome.runtime.id
    const url = `chrome-extension://${extensionId}/popup.html#`
    window.open(url, "_blank")
  }

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <img src={XteriumLogo} className="w-full p-4" alt="Xterium Logo" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{t("Application")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {applicationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => {
                        setActiveItem(item.title)
                        onSetCurrentPage(item.title)
                      }}>
                      <a
                        href={item.url}
                        className={cn(
                          "flex items-center space-x-2 p-3 text-sm",
                          activeItem === item.title ? "text-purple bg-sidebar-accent" : ""
                        )}>
                        <div
                          className={cn(
                            "rounded ",
                            activeItem === item.title
                              ? "text-white bg-[var(--sidebar-icon-background)]"
                              : "bg-transparent primary"
                          )}>
                          <item.icon
                            className={cn(
                              activeItem === item.title ? "primary" : "primary",
                              "rounded",
                              "px-1"
                            )}
                          />
                        </div>
                        <span
                          className={cn(
                            activeItem === item.title ? "text-purple" : "primary"
                          )}>
                          {item.title}
                        </span>
                        {activeItem === item.title && (
                          <div className="absolute right-2 w-1 h-4 rounded active-item" />
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>{t("Setup")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {setupItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => {
                        setActiveItem(item.title)
                        onSetCurrentPage(item.title)
                      }}>
                      <a
                        href={item.url}
                        className={cn(
                          "flex items-center space-x-2 p-3 text-sm",
                          activeItem === item.title ? "text-purple bg-sidebar-accent" : ""
                        )}>
                        <div
                          className={cn(
                            "rounded ",
                            activeItem === item.title
                              ? "text-white bg-[var(--sidebar-icon-background)]"
                              : "bg-transparent primary"
                          )}>
                          <item.icon
                            className={cn(
                              activeItem === item.title ? "primary" : "primary",
                              "rounded",
                              "px-1"
                            )}
                          />
                        </div>
                        <span
                          className={cn(
                            activeItem === item.title ? "text-purple" : "primary"
                          )}>
                          {item.title}
                        </span>
                        {activeItem === item.title && (
                          <div className="absolute right-2 w-1 h-4 rounded active-item" />
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Settings /> {t("Settings")}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuGroup>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>{t("Theme")}</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem onClick={expandView}>
                      <span>{t("Expand View")}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>{selectedLanguage}</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedLangToChange("en")
                              toggleChangeLanguageDrawer()
                            }}>
                            English
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedLangToChange("ja")
                              toggleChangeLanguageDrawer()
                            }}>
                            Japanese
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedLangToChange("ko")
                              toggleChangeLanguageDrawer()
                            }}>
                            Korean
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedLangToChange("zh")
                              toggleChangeLanguageDrawer()
                            }}>
                            Chinese
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleDrawer}>
                    <span>{t("Change Password")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <span>{t("Sign out")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
          <p className="text-xs opacity-50 text-right px-2">Xterium v.0.2.0 (Beta)</p>
        </SidebarFooter>
      </Sidebar>

      <Drawer
        open={isChangePasswordDrawerOpen}
        onOpenChange={setIsChangePasswordDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>CHANGE PASSWORD</DrawerTitle>
          </DrawerHeader>
          <IndexChangePassword handleCallbacks={callbackUpdates} />
        </DrawerContent>
      </Drawer>

      <Drawer
        open={isChangeLanguageDrawerOpen}
        onOpenChange={setIsChangeLanguageDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>CHANGE LANGUAGE</DrawerTitle>
          </DrawerHeader>
          <div className="p-6">
            <div className="mb-8">
              <Label className="text-center tracking-[0.15em] font-semibold leading-2 font-Inter text-base">
                Are you sure you want to change the language?
              </Label>
            </div>
            <div className="flex flex-row space-x-3">
              <Button
                type="button"
                variant="jelly"
                onClick={() => {
                  localStorage.setItem("language", selectedLangToChange)
                  changeLanguage(selectedLangToChange)
                  setIsChangeLanguageDrawerOpen(false)
                  window.location.reload()
                }}>
                CONFIRM
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ApplicationSidebar
