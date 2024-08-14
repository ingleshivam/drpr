// src/components/login/form.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export default function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            console.error(result.error);
            // Handle error state (e.g., show error message to user)
        } else if (result?.ok) {
            router.push('/member'); // Redirect on successful sign-in
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex items-center h-screen">
                <Card className="mx-auto max-w-sm">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold text-center mb-2">LOGIN</CardTitle>
                        <CardDescription className="text-sm">Enter your email and password to login to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}




// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { signIn } from "next-auth/react";
// import { z } from "zod";

// const loginSchema = z.object({
//     email: z.string().email('Invalid email address').nonempty('Email is required'),
//     password: z.string().min(6, 'Password must be at least 6 characters long').nonempty('Password is required'),
// });

// export default function Form() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
//     const router = useRouter();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const validationResult = loginSchema.safeParse({ email, password });

//         if (!validationResult.success) {
//             const fieldErrors = validationResult.error.flatten().fieldErrors;
//             setErrors({
//                 email: fieldErrors.email?.[0],
//                 password: fieldErrors.password?.[0]
//             });
//             return;
//         }

//         const result = await signIn('credentials', {
//             redirect: false,
//             email,
//             password,
//         });

//         if (result?.error) {
//             console.error(result.error);
//             // Handle error state (e.g., show error message to user)
//         } else if (result?.ok) {
//             router.push('/member'); // Redirect on successful sign-in
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <Card className="mx-auto max-w-sm">
//                     <CardHeader className="space-y-1">
//                         <CardTitle className="text-2xl font-bold">Login</CardTitle>
//                         <CardDescription>Enter your email and password to login to your account</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     name="email"
//                                     placeholder="m@example.com"
//                                     required
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     aria-invalid={errors.email ? "true" : "false"}
//                                     aria-describedby="email-error"
//                                 />
//                                 {errors.email && <p id="email-error" className="text-red-500">{errors.email}</p>}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="password">Password</Label>
//                                 <Input
//                                     id="password"
//                                     name="password"
//                                     type="password"
//                                     required
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     aria-invalid={errors.password ? "true" : "false"}
//                                     aria-describedby="password-error"
//                                 />
//                                 {errors.password && <p id="password-error" className="text-red-500">{errors.password}</p>}
//                             </div>
//                             <Button type="submit" className="w-full">
//                                 Login
//                             </Button>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </form>
//         </div>
//     );
// }

