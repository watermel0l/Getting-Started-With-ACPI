(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{297:function(t,e,a){t.exports=a.p+"assets/img/gpio-enabled.c84356b7.png"},298:function(t,e,a){t.exports=a.p+"assets/img/gpi0-2.8c3726d3.png"},299:function(t,e,a){t.exports=a.p+"assets/img/gpi0.b0e0b8d8.png"},300:function(t,e,a){t.exports=a.p+"assets/img/I2C1.0f9ba64b.png"},301:function(t,e,a){t.exports=a.p+"assets/img/ini.d85500ac.png"},354:function(t,e,a){"use strict";a.r(e);var o=a(10),s=Object(o.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"fixing-trackpads-manual"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#fixing-trackpads-manual"}},[t._v("#")]),t._v(" Fixing Trackpads: Manual")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"#checking-gpio"}},[t._v("Checking GPI0")])]),t._v(" "),e("li",[e("a",{attrs:{href:"#edits-to-the-sample-ssdt"}},[t._v("Edits to the sample SSDT")])]),t._v(" "),e("li",[e("a",{attrs:{href:"#enabling-trackpad"}},[t._v("Enabling Trackpad")])]),t._v(" "),e("li",[e("a",{attrs:{href:"#wrapping-up"}},[t._v("Wrapping up")])])]),t._v(" "),e("h2",{attrs:{id:"checking-gpi0"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#checking-gpi0"}},[t._v("#")]),t._v(" Checking GPI0")]),t._v(" "),e("p",[t._v("This page assumes that you have macOS installed as well as "),e("a",{attrs:{href:"https://github.com/khronokernel/IORegistryClone/blob/master/ioreg-302.zip",target:"_blank",rel:"noopener noreferrer"}},[t._v("IORegistryExplorer"),e("OutboundLink")],1),t._v(".")]),t._v(" "),e("p",[t._v("The first thing to check is whether the GPI0 device exists, which is required for VoodooI2C. The best way to check this is working is to use IORegistryExplorer.")]),t._v(" "),e("p",[e("img",{attrs:{src:a(297),alt:""}})]),t._v(" "),e("p",[t._v("Here, we can see that VoodooGPIO is attached to GPI0 so no edits are needed for GPI0. If this is the case for you, you can skip to the "),e("a",{attrs:{href:"#enabling-trackpad"}},[t._v("next section")]),t._v(".")]),t._v(" "),e("p",[t._v("If VoodooGPIO isn't attached, then you may need to modify some values to enable the "),e("code",[t._v("GPI0")]),t._v(" device. In that case, you will need to find the GPI0 device in your DSDT.")]),t._v(" "),e("p",[t._v("First open your decompiled DSDT you got from "),e("RouterLink",{attrs:{to:"/Manual/dump.html"}},[t._v("Dumping the DSDT")]),t._v(" and "),e("RouterLink",{attrs:{to:"/Manual/compile.html"}},[t._v("Decompiling and Compiling")]),t._v(" with either MaciASL (if in macOS) or any other text editor if in Windows or Linux (VSCode has an "),e("a",{attrs:{href:"https://marketplace.visualstudio.com/items?itemName=Thog.vscode-asl",target:"_blank",rel:"noopener noreferrer"}},[t._v("ACPI extension"),e("OutboundLink")],1),t._v(" that can also help).")],1),t._v(" "),e("p",[t._v("Next search for "),e("code",[t._v("Device (GPI0)")]),t._v(". You should get a result similar to this:")]),t._v(" "),e("p",[e("img",{attrs:{src:a(298),alt:""}})]),t._v(" "),e("p",[t._v("Below is the "),e("code",[t._v("_STA")]),t._v(" method, which enables or disable the GPI0 device:")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("Method (_STA, 0, NotSerialized)\n{\n    If ((SBRG == Zero))\n    {\n        Return (Zero)\n    }\n\n    If ((GPEN == Zero))\n    {\n        Return (Zero)\n    }\n\n    Return (0x0F)\n}\n")])])]),e("p",[t._v("We want the value returned from _STA to be non-zero (0x0F in this case) to enable the "),e("code",[t._v("GPI0")]),t._v(" device. If either "),e("code",[t._v("SBRG")]),t._v(" or "),e("code",[t._v("GPEN")]),t._v(" is equal to zero, then zero will be returned and "),e("code",[t._v("GPI0")]),t._v(" will be disabled. Generally, "),e("code",[t._v("SBRG")]),t._v(" should not be modified, as modifying it can break the "),e("code",[t._v("GPI0")]),t._v(" device. Only modify "),e("code",[t._v("GPEN")]),t._v(" if you need to enable the "),e("code",[t._v("GPI0")]),t._v(" device.")]),t._v(" "),e("p",[t._v("Here's some more examples:\n"),e("img",{attrs:{src:a(299),alt:""}})]),t._v(" "),e("p",[t._v("What we care about from this is the "),e("code",[t._v("_STA")]),t._v(" method:")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("Method (_STA, 0, NotSerialized)\n{\n    If ((GPHD == One))\n    {\n        Return (0x03)\n    }\n\n    Return (0x0F)\n}\n")])])]),e("p",[t._v("Here we would want to set "),e("code",[t._v("GPHD")]),t._v(" to "),e("code",[t._v("Zero")]),t._v(" so that 0x0F is returned.")]),t._v(" "),e("h2",{attrs:{id:"edits-to-the-sample-ssdt"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#edits-to-the-sample-ssdt"}},[t._v("#")]),t._v(" Edits to the sample SSDT")]),t._v(" "),e("p",[t._v("Now that we know what variables need to be changed, lets grab our SSDT and get to work:")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/decompiled/SSDT-GPI0.dsl",target:"_blank",rel:"noopener noreferrer"}},[t._v("SSDT-GPI0.dsl"),e("OutboundLink")],1)])]),t._v(" "),e("p",[t._v("From the first example, we'll want to set GPEN to "),e("code",[t._v("One")]),t._v(" to allow it to operate in macOS:")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('// This is likely already set in the SSDT-GPIO you just downloaded\nIf (_OSI ("Darwin"))\n{\n    GPEN = One\n}\n')])])]),e("p",[t._v("For the second example, you'd want to remove GPEN and use the below:")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('If (_OSI ("Darwin"))\n{\n    GPHD = Zero\n}\n')])])]),e("p",[t._v("You will want to test the SSDT at this point by "),e("RouterLink",{attrs:{to:"/Manual/compile.html"}},[t._v("compiling the SSDT")]),t._v(" and adding it to your config.plist. VoodooGPIO should now be attached to the GPI0 device as shown at the top of the GPI0 section. If your trackpad still doesn't work after enabling the "),e("code",[t._v("GPI0")]),t._v(" device, move on to the next section.")],1),t._v(" "),e("h2",{attrs:{id:"enabling-trackpad"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#enabling-trackpad"}},[t._v("#")]),t._v(" Enabling Trackpad")]),t._v(" "),e("p",[t._v("Often times, the I2C devices check to see if they are running in Windows before enabling themselves. Similarly to the "),e("code",[t._v("GPI0")]),t._v(" device, these devices contain a "),e("code",[t._v("_STA")]),t._v(" method.")]),t._v(" "),e("details",{staticClass:"custom-block details"},[e("summary",[t._v("_STA Example (Optional)")]),t._v(" "),e("p",[e("img",{attrs:{src:a(300),alt:""}})]),t._v(" "),e("p",[t._v("The part we care about is the "),e("code",[t._v("_STA")]),t._v(" method:")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("Method (_STA, 0, NotSerialized)  // _STA: Status\n{\n    Return (LSTA (SMD1))\n}\n")])])]),e("p",[t._v("In this case, "),e("code",[t._v("_STA")]),t._v(" is referring to another method, "),e("code",[t._v("LSTA")]),t._v(". If we search for "),e("code",[t._v("Method (LSTA")]),t._v(", we'll see the below:")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("Method (LSTA, 1, Serialized)\n{\n    If (((Arg0 == 0x00) || (Arg0 == 0x03)))\n    {\n        Return (0x00)\n    }\n\n    If (CondRefOf (OSYS))\n    {\n        If ((OSYS < 0x07DC))\n        {\n            Return (0x00)\n        }\n    }\n\n    Return (0x0F)\n}\n")])])]),e("p",[t._v("The value "),e("code",[t._v("OSYS")]),t._v(", stores information about the current OS running. We will want to look for any place in which "),e("code",[t._v("OSYS")]),t._v(" is set ("),e("code",[t._v("OSYS = 0x07DC")]),t._v(" for example). In this DSDT, this is set under "),e("code",[t._v("\\_SB.PCI0._INI")]),t._v(" as shown below:")]),t._v(" "),e("p",[e("img",{attrs:{src:a(301),alt:""}})]),t._v(" "),e("p",[t._v("There are various checks for many different versions of Windows, but there is no check for "),e("code",[t._v("Darwin")]),t._v(" (which Apple's ACPI usually checks for). We generally want to set "),e("code",[t._v("OSYS")]),t._v(' to the highest possible value to enable the most features. In this case, the highest value is set when the version of Windows is "Windows 2015", or '),e("a",{attrs:{href:"https://docs.microsoft.com/en-us/windows-hardware/drivers/acpi/winacpi-osi#_osi-strings-for-windows-operating-systems",target:"_blank",rel:"noopener noreferrer"}},[t._v("Windows 10"),e("OutboundLink")],1),t._v(". This means that we should set "),e("code",[t._v("OSYS")]),t._v(" to "),e("code",[t._v("0x07DF")]),t._v(". Notice that this value is greater than "),e("code",[t._v("0x07DC")]),t._v(", which is the value that was checked for earlier. If we set "),e("code",[t._v("OSYS")]),t._v(" to "),e("code",[t._v("0x07DF")]),t._v(", then the check in LSTA should return "),e("code",[t._v("0x0F")]),t._v(".")])]),t._v(" "),e("p",[t._v("The best way to patch these checks is to use _OSI to XOSI with SSDT-XOSI. You can also set "),e("code",[t._v("OSYS")]),t._v(" within the scope of the I2C device, though this may not always work (The above example would not work here as LSTA is not within the scope of the I2C device).")]),t._v(" "),e("h3",{attrs:{id:"osi-to-xosi"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#osi-to-xosi"}},[t._v("#")]),t._v(" _OSI to XOSI")]),t._v(" "),e("p",[t._v("Requires the below SSDT and patch")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/decompiled/SSDT-XOSI.dsl",target:"_blank",rel:"noopener noreferrer"}},[t._v("SSDT-XOSI.dsl"),e("OutboundLink")],1),t._v(" - If you need to edit "),e("a",{attrs:{href:"https://docs.microsoft.com/en-us/windows-hardware/drivers/acpi/winacpi-osi#_osi-strings-for-windows-operating-systems",target:"_blank",rel:"noopener noreferrer"}},[t._v("which versions of Windows the SSDT checks for"),e("OutboundLink")],1),t._v(".")]),t._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-XOSI.aml",target:"_blank",rel:"noopener noreferrer"}},[t._v("SSDT-XOSI.aml"),e("OutboundLink")],1),t._v(" - Precompiled")]),t._v(" "),e("li",[t._v("XOSI Rename (Add this under ACPI -> Patch in your config.plist):")])]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("Comment")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("String")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Change _OSI to XOSI")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("Enabled")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("Boolean")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("YES")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("Count")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("Number")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("0")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("Limit")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("Number")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("0")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("Find")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("Data")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("5f4f5349")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("Replace")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("Data")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("584f5349")])])])]),t._v(" "),e("details",{staticClass:"custom-block details"},[e("summary",[t._v("Dell Machines")]),t._v(" "),e("p",[t._v("You may need to add the below patch to allow the backlight keys to work.\nMake sure that this patch appears "),e("strong",[t._v("BEFORE")]),t._v(" the previous _OSI to XOSI patch in your config.plist\nCredit to Rehabman for the below patch:")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("Comment")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("String")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Change _OSID to XSID (to avoid match against _OSI patch)")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("Enabled")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("Boolean")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("YES")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("Count")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("Number")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("0")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("Limit")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("Number")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("0")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("Find")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("Data")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("4F534944")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("Replace")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("Data")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("58534944")])])])])]),t._v(" "),e("h3",{attrs:{id:"create-osys-variable-under-i2c-scope"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#create-osys-variable-under-i2c-scope"}},[t._v("#")]),t._v(" Create OSYS Variable Under I2C Scope")]),t._v(" "),e("p",[t._v("You will need to find the device path where OSYS is checked, then create a new OSYS variable within that scope. This will only change OSYS for devices under this scope, which can allow for finer control over what is enabled. Note that in the example above, "),e("code",[t._v("LSTA")]),t._v(" exists under "),e("code",[t._v("\\_SB.PCI0.LSTA")]),t._v(", meaning that both "),e("code",[t._v("\\_SB.PCI0._INI")]),t._v(" and "),e("code",[t._v("\\_SB.PCI0.LSTA")]),t._v(" will control the same OSYS variable. If this is the case, this method will not work.")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('If (_OSI("Darwin")) {\n    Scope (\\_SB.PCI0.I2C0) { // I2C0 scope\n        Name (OSYS, 0x7DF)\n    }\n}\n')])])]),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("Multiple Windows Versions")]),t._v(" "),e("p",[t._v('Windows will also return true for checks of earlier versions of Windows. For example, Windows 7 would return true for "Windows 2000" through "Windows 2009", but not any version after. This is important as some features are only enabled in earlier Windows checks. For example, DYTC thermal management on newer ThinkPads is only enabled in the check for "Windows 2001". You will need to check your own DSDT and see what values it sets and where they are used. At this point, you should '),e("RouterLink",{attrs:{to:"/Manual/compile.html"}},[t._v("compiling the SSDT")]),t._v(" and see if the trackpad works.")],1)]),t._v(" "),e("h2",{attrs:{id:"further-setup"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#further-setup"}},[t._v("#")]),t._v(" Further Setup")]),t._v(" "),e("p",[t._v("If you need further help getting your trackpad to work, then the best place to look is "),e("a",{attrs:{href:"https://github.com/VoodooI2C/VoodooI2C",target:"_blank",rel:"noopener noreferrer"}},[t._v("VoodooI2C's readme"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"wrapping-up"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#wrapping-up"}},[t._v("#")]),t._v(" Wrapping up")]),t._v(" "),e("p",[t._v("Once you're done making your SSDT, either head to the next page to finish the rest of the SSDTs or head here if you're ready to wrap up:")]),t._v(" "),e("ul",[e("li",[e("RouterLink",{attrs:{to:"/cleanup.html"}},[e("strong",[t._v("Cleanup")])])],1)])])}),[],!1,null,null,null);e.default=s.exports}}]);