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
            <NavbarBrand style={{ color: 'white' }}>2024 Membership Info</NavbarBrand>
            <NavbarContent style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <NavbarItem>
                <Link href="/data_visuals/membership_info/table_view">
                    <Button style={{ color: 'white' }}>Table View</Button>
                </Link>
                </NavbarItem>
                <NavbarItem>
                <Link href="/data_visuals/membership_info/pie_view">
                    <Button style={{ color: 'white' }}>Pie View</Button>
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
