"use client";
import { ReactNode, isValidElement } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';

interface LayoutProps {
    children: ReactNode;
}


export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Navbar position='sticky' style={{ backgroundColor: 'black', color: 'white', width: '100%', top: 0, padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
            <NavbarBrand style={{ color: 'white' }}>FitPro Info</NavbarBrand>
            <NavbarContent style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto' }}>
                <NavbarItem>
                <Link href="/data_visuals/fitpro_info/graph_view">
                    <Button style={{ color: 'white' }}>Graph View</Button>
                </Link>
                </NavbarItem>
            </NavbarContent>
            </Navbar>
            <div style={{ paddingTop: '10px' }}>
            {children}
            </div>
        </>
    );
}
