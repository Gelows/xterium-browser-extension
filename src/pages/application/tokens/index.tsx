import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { TokenData, TokenImages } from "@/data/token.data"
import { TokenModel } from "@/models/token.model"
import { TokenService } from "@/services/token.service"
import { Pencil, Trash, X } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"

import IndexAddToken from "./addToken"
import IndexDeleteToken from "./deleteToken"
import IndexEditToken from "./editToken"
import { toast } from "@/hooks/use-toast"

const IndexTokens = () => {
  const [tokens, setTokens] = useState<TokenModel[]>([])
  const [selectedToken, setSelectedToken] = useState<TokenModel>({
    id: 0,
    type: "",
    network: "",
    network_id: 0,
    symbol: "",
    description: "",
    image_url: "Default"
  })
  const [isAddTokenDrawerOpen, setIsAddTokenDrawerOpen] =
    useState<boolean>(false)
  const [isEditTokenDrawerOpen, setIsEditTokenDrawerOpen] =
    useState<boolean>(false)
  const [isDeleteTokenDrawerOpen, setIsDeleteTokenDrawerOpen] =
  useState(false)

  const preloadTokens = () => {
    let tokenList: any[] = []

    let tokenService = new TokenService()
    tokenService.getTokens().then((data) => {
      let preloadedTokenData = TokenData
      if (preloadedTokenData.length > 0) {
        for (let i = 0; i < preloadedTokenData.length; i++) {
          let existingToken = data.filter(
            (d) => d.symbol == preloadedTokenData[i].symbol
          )[0]

          if (existingToken != null) {
            tokenList.push({ ...existingToken, preloaded: true })
          } else {
            tokenService.createToken(preloadedTokenData[i])
            tokenList.push({ ...preloadedTokenData[i], preloaded: true })
          }
        }
      }

      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let existingToken = tokenList.filter(
            (d) => d.symbol == data[i].symbol
          )[0]

          if (existingToken == null) {
            tokenList.push(data[i])
          }
        }
      }

      setTokens(tokenList)
    })
  }

  const getTokens = () => {
    preloadTokens()
  }

  const getTokenImage = (imageName: string) => {
    const tokenImages = new TokenImages()
    return tokenImages.getBase64Image(imageName)
  }

  useEffect(() => {
    getTokens()
  }, [])

  const addToken = () => {
    setIsAddTokenDrawerOpen(true)
  }

  const editToken = (data: TokenModel) => {
    setIsEditTokenDrawerOpen(true)
    setSelectedToken(data)
  }

  const deleteToken = (data: TokenModel) => {
    if (data.preloaded) {
      toast({
        description: (
          <div className="flex items-center">
            <X className="mr-2 text-red-500" />
            This token is preloaded and cannot be deleted!
          </div>
        ),
        variant: "default"
      })
      return
    }
    setIsDeleteTokenDrawerOpen(true)
    setSelectedToken(data)
  }

  const saveAndUpdateToken = () => {
    setIsAddTokenDrawerOpen(false)
    setIsEditTokenDrawerOpen(false)
    setIsDeleteTokenDrawerOpen(false)

    setTimeout(() => {
      getTokens()
    }, 100)
  }

  return (
    <>
      <div className="py-4 flex flex-col justify-between h-full">
        <div className="py-4">
          <Card className="mb-3 card-bg-image">
            <CardHeader>
              <CardTitle>
                <b className="text-white">NATIVE TOKEN</b>
              </CardTitle>
            </CardHeader>
            <Table>
              <TableBody>
                {tokens
                  .filter((token) => token.type === "Native")
                  .map((token) => (
                    <TableRow key={token.symbol}>
                      <TableCell className="w-[50px] justify-center">
                        <Image
                          src={getTokenImage(token.image_url)}
                          alt={`${token.description} Logo`}
                          className="ml-1"
                          width={40}
                          height={40}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="mb-[2px]">
                          <span className="text-lg font-bold text-white">
                            {token.symbol}
                          </span>
                        </div>
                        <Badge>{token.description}</Badge>
                      </TableCell>
                      <TableCell className="w-[30px] justify-center text-center text-white-500 pr-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <button
                                onClick={() => editToken(token)}
                                className="w-full h-full flex items-center justify-center">
                                <Pencil />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Token</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="w-[30px] justify-center text-center text-red-500 pr-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <button
                                onClick={() => deleteToken(token)}
                                className={`w-full h-full flex items-center justify-center ${
                                  token.preloaded ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                              >
                                <Trash />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Token</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="mb-3">
            <CardHeader>
              <CardTitle>
                <b>ASSETS</b>
              </CardTitle>
            </CardHeader>
            <Table>
              <TableBody>
                {tokens
                  .filter((token) => token.type === "Asset")
                  .map((token) => (
                    <TableRow
                      key={token.symbol}
                      className="cursor-pointer hover-bg-custom">
                      <TableCell className="w-[50px] justify-center">
                        <Image
                          src={getTokenImage(token.image_url)}
                          alt={`${token.description} Logo`}
                          className="ml-1"
                          width={40}
                          height={40}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="mb-[2px]">
                          <span className="text-lg font-bold">
                            {token.symbol}
                          </span>
                        </div>
                        <Badge>{token.description}</Badge>
                      </TableCell>
                      <TableCell className="w-[30px] justify-center text-center text-white-500 pr-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <button
                                onClick={() => editToken(token)}
                                className="w-full h-full flex items-center justify-center">
                                <Pencil />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Token</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="w-[30px] justify-center text-center text-red-500 pr-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <button
                                onClick={() => deleteToken(token)}
                                className={`w-full h-full flex items-center justify-center ${
                                  token.preloaded ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                              >
                                <Trash />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Token</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <Button variant="violet" className="my-auto" onClick={addToken}>
          ADD NEW TOKEN
        </Button>

        <Drawer
          open={isAddTokenDrawerOpen}
          onOpenChange={setIsAddTokenDrawerOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>ADD NEW TOKEN</DrawerTitle>
            </DrawerHeader>
            <IndexAddToken handleCallbacks={saveAndUpdateToken} />
          </DrawerContent>
        </Drawer>

        <Drawer
          open={isEditTokenDrawerOpen}
          onOpenChange={setIsEditTokenDrawerOpen}>
          <DrawerTrigger asChild></DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="flex items-center justify-center space-x-2">
                <span>Edit</span>
                <Image
                  src={getTokenImage(selectedToken.image_url)}
                  alt={`${selectedToken.symbol} logo`}
                  width={18}
                  height={18}
                  className="rounded"
                />
                <span className="font-bold text-md">
                  {selectedToken.symbol}
                </span>
                <span>Token</span>
              </DrawerTitle>
            </DrawerHeader>
            <IndexEditToken
              selectedToken={selectedToken}
              handleCallbacks={saveAndUpdateToken}
            />
          </DrawerContent>
        </Drawer>

        <Drawer
          open={isDeleteTokenDrawerOpen}
          onOpenChange={setIsDeleteTokenDrawerOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>DELETE TOKEN</DrawerTitle>
            </DrawerHeader>
            <IndexDeleteToken
              selectedToken={selectedToken}
              handleCallbacks={saveAndUpdateToken}
            />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}

export default IndexTokens
