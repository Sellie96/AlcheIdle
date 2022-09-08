"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDecoratorArguments = exports.safelyMergeObjects = exports.serializePrimitiveObjectToAst = exports.isCallExpressionOf = exports.createNamedImport = exports.createImportEquals = exports.hasImport = exports.hasDecorators = exports.hasModifiers = exports.findNullableTypeFromUnion = exports.getJsDocDeprecation = exports.hasJSDocTags = exports.getJSDocDescription = exports.getDecoratorName = exports.getDecoratorArguments = exports.getDefaultTypeFormatFlags = exports.getText = exports.hasObjectFlag = exports.hasFlag = exports.isUndefined = exports.isNull = exports.isEnumLiteral = exports.isEnum = exports.isInterface = exports.isNumber = exports.isString = exports.isBoolean = exports.getTypeArguments = exports.isArray = exports.getModifiers = exports.getDecorators = exports.isInUpdatedAstContext = void 0;
const ts = require("typescript");
const typescript_1 = require("typescript");
const plugin_utils_1 = require("./plugin-utils");
const [tsVersionMajor, tsVersionMinor] = (_a = ts.versionMajorMinor) === null || _a === void 0 ? void 0 : _a.split('.').map((x) => +x);
exports.isInUpdatedAstContext = tsVersionMinor >= 8 || tsVersionMajor > 4;
function getDecorators(node) {
    var _a;
    return exports.isInUpdatedAstContext
        ? (_a = (ts.canHaveDecorators(node) && ts.getDecorators(node))) !== null && _a !== void 0 ? _a : []
        : node.decorators;
}
exports.getDecorators = getDecorators;
function getModifiers(node) {
    var _a;
    return exports.isInUpdatedAstContext
        ? (_a = (ts.canHaveModifiers(node) && ts.getModifiers(node))) !== null && _a !== void 0 ? _a : []
        : node.modifiers;
}
exports.getModifiers = getModifiers;
function isArray(type) {
    const symbol = type.getSymbol();
    if (!symbol) {
        return false;
    }
    return symbol.getName() === 'Array' && getTypeArguments(type).length === 1;
}
exports.isArray = isArray;
function getTypeArguments(type) {
    return type.typeArguments || [];
}
exports.getTypeArguments = getTypeArguments;
function isBoolean(type) {
    return hasFlag(type, typescript_1.TypeFlags.Boolean);
}
exports.isBoolean = isBoolean;
function isString(type) {
    return hasFlag(type, typescript_1.TypeFlags.String);
}
exports.isString = isString;
function isNumber(type) {
    return hasFlag(type, typescript_1.TypeFlags.Number);
}
exports.isNumber = isNumber;
function isInterface(type) {
    return hasObjectFlag(type, typescript_1.ObjectFlags.Interface);
}
exports.isInterface = isInterface;
function isEnum(type) {
    const hasEnumFlag = hasFlag(type, typescript_1.TypeFlags.Enum);
    if (hasEnumFlag) {
        return true;
    }
    if (isEnumLiteral(type)) {
        return false;
    }
    const symbol = type.getSymbol();
    if (!symbol) {
        return false;
    }
    const valueDeclaration = symbol.valueDeclaration;
    if (!valueDeclaration) {
        return false;
    }
    return valueDeclaration.kind === typescript_1.SyntaxKind.EnumDeclaration;
}
exports.isEnum = isEnum;
function isEnumLiteral(type) {
    return hasFlag(type, typescript_1.TypeFlags.EnumLiteral) && !type.isUnion();
}
exports.isEnumLiteral = isEnumLiteral;
function isNull(type) {
    if (type.isUnion()) {
        return Boolean(type.types.find((t) => hasFlag(t, typescript_1.TypeFlags.Null)));
    }
    else {
        return hasFlag(type, typescript_1.TypeFlags.Null);
    }
}
exports.isNull = isNull;
function isUndefined(type) {
    if (type.isUnion()) {
        return Boolean(type.types.find((t) => hasFlag(t, typescript_1.TypeFlags.Undefined)));
    }
    else {
        return hasFlag(type, typescript_1.TypeFlags.Undefined);
    }
}
exports.isUndefined = isUndefined;
function hasFlag(type, flag) {
    return (type.flags & flag) === flag;
}
exports.hasFlag = hasFlag;
function hasObjectFlag(type, flag) {
    return (type.objectFlags & flag) === flag;
}
exports.hasObjectFlag = hasObjectFlag;
function getText(type, typeChecker, enclosingNode, typeFormatFlags) {
    if (!typeFormatFlags) {
        typeFormatFlags = getDefaultTypeFormatFlags(enclosingNode);
    }
    const compilerNode = !enclosingNode ? undefined : enclosingNode;
    return typeChecker.typeToString(type, compilerNode, typeFormatFlags);
}
exports.getText = getText;
function getDefaultTypeFormatFlags(enclosingNode) {
    let formatFlags = typescript_1.TypeFormatFlags.UseTypeOfFunction |
        typescript_1.TypeFormatFlags.NoTruncation |
        typescript_1.TypeFormatFlags.UseFullyQualifiedType |
        typescript_1.TypeFormatFlags.WriteTypeArgumentsOfSignature;
    if (enclosingNode && enclosingNode.kind === typescript_1.SyntaxKind.TypeAliasDeclaration)
        formatFlags |= typescript_1.TypeFormatFlags.InTypeAlias;
    return formatFlags;
}
exports.getDefaultTypeFormatFlags = getDefaultTypeFormatFlags;
function getDecoratorArguments(decorator) {
    const callExpression = decorator.expression;
    return (callExpression && callExpression.arguments) || [];
}
exports.getDecoratorArguments = getDecoratorArguments;
function getDecoratorName(decorator) {
    const isDecoratorFactory = decorator.expression.kind === typescript_1.SyntaxKind.CallExpression;
    if (isDecoratorFactory) {
        const callExpression = decorator.expression;
        const identifier = callExpression
            .expression;
        if ((0, plugin_utils_1.isDynamicallyAdded)(identifier)) {
            return undefined;
        }
        return getIdentifierFromName(callExpression.expression).getText();
    }
    return getIdentifierFromName(decorator.expression).getText();
}
exports.getDecoratorName = getDecoratorName;
function getIdentifierFromName(expression) {
    const identifier = getNameFromExpression(expression);
    if (expression && expression.kind !== typescript_1.SyntaxKind.Identifier) {
        throw new Error();
    }
    return identifier;
}
function getNameFromExpression(expression) {
    if (expression && expression.kind === typescript_1.SyntaxKind.PropertyAccessExpression) {
        return expression.name;
    }
    return expression;
}
function getJSDocDescription(node) {
    const jsDoc = node.jsDoc;
    if (!jsDoc) {
        return undefined;
    }
    return (0, typescript_1.getTextOfJSDocComment)(jsDoc[0].comment);
}
exports.getJSDocDescription = getJSDocDescription;
function hasJSDocTags(node, tagName) {
    const tags = (0, typescript_1.getJSDocTags)(node);
    return tags.some((tag) => tagName.includes(tag.tagName.text));
    // return jsDoc;
}
exports.hasJSDocTags = hasJSDocTags;
function getJsDocDeprecation(node) {
    const deprecatedTag = (0, typescript_1.getJSDocDeprecatedTag)(node);
    if (!deprecatedTag) {
        return undefined;
    }
    return (0, typescript_1.getTextOfJSDocComment)(deprecatedTag.comment) || 'deprecated';
}
exports.getJsDocDeprecation = getJsDocDeprecation;
function findNullableTypeFromUnion(typeNode, typeChecker) {
    return typeNode.types.find((tNode) => hasFlag(typeChecker.getTypeAtLocation(tNode), typescript_1.TypeFlags.Null));
}
exports.findNullableTypeFromUnion = findNullableTypeFromUnion;
function hasModifiers(modifiers, toCheck) {
    if (!modifiers) {
        return false;
    }
    return modifiers.some((modifier) => toCheck.includes(modifier.kind));
}
exports.hasModifiers = hasModifiers;
function hasDecorators(decorators, toCheck) {
    if (!decorators) {
        return false;
    }
    return decorators.some((decorator) => {
        return toCheck.includes(getDecoratorName(decorator));
    });
}
exports.hasDecorators = hasDecorators;
function hasImport(sf, what) {
    for (const statement of sf.statements) {
        if (ts.isImportDeclaration(statement) &&
            ts.isNamedImports(statement.importClause.namedBindings)) {
            const bindings = statement.importClause.namedBindings.elements;
            for (const namedBinding of bindings) {
                if (namedBinding.name.text === what) {
                    return true;
                }
            }
        }
    }
    return false;
}
exports.hasImport = hasImport;
function createImportEquals(f, identifier, from) {
    var _a;
    const [major, minor] = (_a = ts.versionMajorMinor) === null || _a === void 0 ? void 0 : _a.split('.').map((x) => +x);
    if (major >= 4 && minor >= 2) {
        // support TS v4.2+
        return minor >= 8
            ? f.createImportEqualsDeclaration(undefined, false, identifier, f.createExternalModuleReference(f.createStringLiteral(from)))
            : f.createImportEqualsDeclaration(undefined, undefined, false, identifier, f.createExternalModuleReference(f.createStringLiteral(from)));
    }
    return f.createImportEqualsDeclaration(undefined, undefined, identifier, f.createExternalModuleReference(f.createStringLiteral(from)));
}
exports.createImportEquals = createImportEquals;
function createNamedImport(f, what, from) {
    const importClause = f.createImportClause(false, undefined, f.createNamedImports(what.map((name) => f.createImportSpecifier(false, undefined, f.createIdentifier(name)))));
    return exports.isInUpdatedAstContext
        ? f.createImportDeclaration(undefined, importClause, f.createStringLiteral(from))
        : f.createImportDeclaration(undefined, undefined, importClause, f.createStringLiteral(from));
}
exports.createNamedImport = createNamedImport;
function isCallExpressionOf(name, node) {
    return ts.isIdentifier(node.expression) && node.expression.text === name;
}
exports.isCallExpressionOf = isCallExpressionOf;
function isNode(value) {
    return typeof value === 'object' && value.constructor.name === 'NodeObject';
}
function serializePrimitiveObjectToAst(f, object) {
    const properties = [];
    Object.keys(object).forEach((key) => {
        const value = object[key];
        if (value === undefined) {
            return;
        }
        let initializer;
        if (isNode(value)) {
            initializer = value;
        }
        else if (typeof value === 'string') {
            initializer = f.createStringLiteral(value);
        }
        else if (typeof value === 'boolean') {
            initializer = value ? f.createTrue() : f.createFalse();
        }
        else if (typeof value === 'object') {
            initializer = serializePrimitiveObjectToAst(f, value);
        }
        properties.push(f.createPropertyAssignment(key, initializer));
    });
    return f.createObjectLiteralExpression(properties);
}
exports.serializePrimitiveObjectToAst = serializePrimitiveObjectToAst;
function safelyMergeObjects(f, a, b) {
    // if both of objects are ObjectLiterals, so merge property by property in compile time
    // if one or both of expressions not an object literal, produce rest spread and merge in runtime
    if (ts.isObjectLiteralExpression(a) && ts.isObjectLiteralExpression(b)) {
        const aMap = a.properties.reduce((acc, prop) => {
            acc[prop.name.text] = prop;
            return acc;
        }, {});
        b.properties.forEach((prop) => {
            aMap[prop.name.text] = prop;
        }, {});
        return f.createObjectLiteralExpression(Object.values(aMap));
    }
    else {
        return f.createObjectLiteralExpression([
            f.createSpreadAssignment(a),
            f.createSpreadAssignment(b),
        ]);
    }
}
exports.safelyMergeObjects = safelyMergeObjects;
function updateDecoratorArguments(f, node, decoratorName, replaceFn) {
    let updated = false;
    const nodeOriginalDecorators = getDecorators(node);
    const decorators = nodeOriginalDecorators.map((decorator) => {
        if (getDecoratorName(decorator) !== decoratorName) {
            return decorator;
        }
        const decoratorExpression = decorator.expression;
        updated = true;
        return f.updateDecorator(decorator, f.updateCallExpression(decoratorExpression, decoratorExpression.expression, decoratorExpression.typeArguments, replaceFn(decoratorExpression.arguments)));
    });
    if (!updated) {
        return node;
    }
    if (ts.isClassDeclaration(node)) {
        return (exports.isInUpdatedAstContext
            ? f.updateClassDeclaration(node, [...decorators, ...getModifiers(node)], node.name, node.typeParameters, node.heritageClauses, node.members)
            : f.updateClassDeclaration(node, decorators, node.modifiers, node.name, node.typeParameters, node.heritageClauses, node.members));
    }
    if (ts.isPropertyDeclaration(node)) {
        return (exports.isInUpdatedAstContext
            ? f.updatePropertyDeclaration(node, [...decorators, ...getModifiers(node)], node.name, node.questionToken, node.type, node.initializer)
            : f.updatePropertyDeclaration(node, decorators, node.modifiers, node.name, node.questionToken, node.type, node.initializer));
    }
    if (ts.isGetAccessorDeclaration(node)) {
        return (exports.isInUpdatedAstContext
            ? f.updateGetAccessorDeclaration(node, [...decorators, ...getModifiers(node)], node.name, node.parameters, node.type, node.body)
            : f.updateGetAccessorDeclaration(node, decorators, node.modifiers, node.name, node.parameters, node.type, node.body));
    }
}
exports.updateDecoratorArguments = updateDecoratorArguments;
